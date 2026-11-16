const systemPrompt = "You are a travel planning assistant. You MUST always respond with valid JSON data following this EXACT schema:\n\n{\n  \"location\": \"string\",\n  \"duration\": \"string\",\n  \"num_people\": \"string\",\n  \"budget\": \"string\",\n  \"hotels\": [\n    {\n      \"hotelName\": \"string\",\n      \"hotelAddress\": \"string\",\n      \"price\": \"string\",\n      \"rating\": \"string\",\n      \"description\": \"string\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"bestTime\": \"string\",\n      \"plan\": [\n        {\n          \"placeName\": \"string\",\n          \"placeDetails\": \"string\",\n          \"placeAddress\": \"string\",\n          \"ticketPricing\": \"string\",\n          \"timeTravel\": \"string\",\n          \"rating\": \"string\"\n        }\n      ]\n    }\n  }\n}\n\nIMPORTANT:\n1. Always include at least 3 hotels\n2. For each day in the itinerary, include at least 3 places to visit\n3. Every field must be filled with realistic, detailed information\n4. Do not include any text outside the JSON structure\n5. Ensure the JSON is properly formatted and valid";
export default async function handler(req,res) {
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed'});}
 const prompt=req.body?.prompt;
 if(typeof prompt!=='string'||!prompt.trim()||prompt.length>4000)return res.status(400).json({error:'Invalid trip request'});
 const token=req.headers.authorization?.match(/^Bearer ([^ ]+)$/)?.[1];
 if(!token)return res.status(401).json({error:'Please sign in.'});
 const firebaseKey=process.env.VITE_FIREBASE_API_KEY;
 if(!firebaseKey||!process.env.GEMINI_API_KEY)return res.status(503).json({error:'Trip generation is not configured yet.'});
 try {
  const check=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(firebaseKey)}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idToken:token}),signal:AbortSignal.timeout(10000)});
  if(!check.ok)return res.status(401).json({error:'Your session expired. Please sign in again.'});
  const identity=await check.json();
  if(!identity.users?.[0]?.localId)return res.status(401).json({error:'Invalid session.'});
  const model=process.env.GEMINI_MODEL||'gemini-2.5-flash';
  if(!/^[a-zA-Z0-9.-]+$/.test(model))return res.status(503).json({error:'Invalid model configuration'});
  const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':process.env.GEMINI_API_KEY},signal:AbortSignal.timeout(40000),body:JSON.stringify({systemInstruction:{parts:[{text:systemPrompt}]},contents:[{role:'user',parts:[{text:prompt}]}],generationConfig:{responseMimeType:'application/json',maxOutputTokens:8192}})});
  if(!response.ok)return res.status(502).json({error:'Travel planning service is unavailable. Please try again.'});
  const data=await response.json();
  const text=data.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('');
  let trip;try{trip=JSON.parse(text);}catch{return res.status(502).json({error:'The travel plan was incomplete. Please try again.'});}
  if(!Array.isArray(trip?.hotels)||!trip.hotels.length||!trip.itinerary||typeof trip.itinerary!=='object')return res.status(502).json({error:'Invalid travel plan returned.'});
  return res.status(200).json({trip});
 }catch{return res.status(502).json({error:'Unable to contact the travel planning service. Please try again.'});}
}

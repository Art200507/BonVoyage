import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/generate-trip.js';
async function call(body,token){const res={setHeader(){},status(n){this.code=n;return this},json(data){this.data=data;return this}};await handler({method:'POST',body,headers:token?{authorization:`Bearer ${token}`} : {}},res);return res;}
test('generation requires valid input and verified identity before using Gemini',async()=>{
 assert.equal((await call({prompt:1})).code,400);
 assert.equal((await call({prompt:'trip'})).code,401);
 process.env.GEMINI_API_KEY='test-secret';process.env.VITE_FIREBASE_API_KEY='test-config';const original=global.fetch;
 try{
  let calls=0;global.fetch=async()=>{calls++;return {ok:false}};
  assert.equal((await call({prompt:'trip'},'fake')).code,401);assert.equal(calls,1);
  global.fetch=async url=>url.includes('accounts:lookup')?{ok:true,json:async()=>({users:[{localId:'owner'}]})}:{ok:true,json:async()=>({candidates:[{content:{parts:[{text:JSON.stringify({hotels:[{hotelName:'Sample'}],itinerary:{day1:{}}})}]}}]})};
  assert.equal((await call({prompt:'trip'},'valid')).code,200);
  global.fetch=async url=>url.includes('accounts:lookup')?{ok:true,json:async()=>({users:[{localId:'owner'}]})}:{ok:true,json:async()=>({candidates:[]})};
  assert.equal((await call({prompt:'trip'},'valid')).code,502);
 }finally{global.fetch=original;delete process.env.GEMINI_API_KEY;delete process.env.VITE_FIREBASE_API_KEY;}
});

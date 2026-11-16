import { auth } from './firebaseConfig';
export const chatSession = {
 async sendMessage(prompt) {
  if (!auth?.currentUser) throw new Error('Please sign in again.');
  const token = await auth.currentUser.getIdToken();
  const res = await fetch('/api/generate-trip', {method:'POST', headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`}, body:JSON.stringify({prompt})});
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Unable to generate trip.');
  return {response:{text:()=>JSON.stringify(data.trip)}};
 }
};

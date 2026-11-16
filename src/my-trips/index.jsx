import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {

  const navigation=useNavigate();
  const [userTrips,setUserTrips]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  useEffect(()=>{
    if(!auth){setError('Sign-in is not configured yet.');setLoading(false);return;}
    let active=true;
    const unsubscribe=onAuthStateChanged(auth,async user=>{
      if(!user){navigation('/');return;}
      try{
        const q=query(collection(db,'AITrips'),where('ownerUid','==',user.uid));
        const snapshot=await getDocs(q);
        if(active)setUserTrips(snapshot.docs.map(doc=>doc.data()));
      }catch{if(active)setError('Unable to load your trips. Please try again.');}
      finally{if(active)setLoading(false);}
    });
    return ()=>{active=false;unsubscribe();};
  },[navigation]);

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>My Trips</h2>

      {error && <p role="alert">{error}</p>}
      {!loading && !error && !userTrips.length && <p>No trips yet. Create your first itinerary.</p>}
      <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
        {userTrips?.length>0?userTrips.map((trip,index)=>(
          <UserTripCardItem trip={trip} key={index} />
        ))
      :loading && [1,2,3,4,5,6].map((item,index)=>(
        <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'>

        </div>
      ))
      }
      </div>
    </div> 
  )
}

export default MyTrips
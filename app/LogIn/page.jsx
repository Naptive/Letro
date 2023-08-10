'use client'
import React, { useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/config/FireBase';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Import js-cookie

function Login() {
  const router = useRouter();
  
  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider).then(() => {
        router.push('/');
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Check if user is authenticated when component mounts
 
  
  return (
    <main>
    <div className='w-[20em w-[20em]'>
     <button onClick={googleSignIn} className='bg-red-500'>Google</button>
    </div>
    </main>
  )
}

export default Login
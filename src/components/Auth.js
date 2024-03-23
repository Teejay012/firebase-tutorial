import React, { useState } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
// import { async } from '@firebase/util';

const Auth = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async ()=>{
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // const timestamp = new Date().toLocaleString();
      // alert(`User has been logged in at ${timestamp}.`);
    } catch (error) {
      console.error('Sign-in error:', error.message);
      alert(`Sign-in error: ${error.message}`);
    }
  };

  const signInWithGoogle = async ()=>{
    try {
      await signInWithPopup(auth, googleProvider);

    } catch (error) {
      console.error('Sign-in error:', error.message);
      alert(`Sign-in error: ${error.message}`);
    }
  };

  const logout = async ()=>{
    try {
      await signOut(auth);

    } catch (error) {
      console.error('Sign-in error:', error.message);
      alert(`Sign-in error: ${error.message}`);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder='Password' 
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign in</button>

      <button onClick={signInWithGoogle}>Sign In Google</button>

      <button onClick={logout}>Log Out</button>
    </div>
  )
}

export default Auth

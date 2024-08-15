'use client'
import  { useEffect, useState } from 'react'
import {toast} from "react-hot-toast"
import axios from "axios"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
 export default function SignUpPage(){
  const [user,Setuser]=useState({
    username:"",
    email:"",
    password:""
  })

  const [buttonDisable,SetbuttonDisable,]=useState(false)
  const[loading,Setloading]=useState(false)

  const router=useRouter()

  const onSignup=async()=>{
    try{
   Setloading(true)
  const response=await axios.post("/api/users/signup",user)
  console.log("signup successfully",response.data)
  router.push("/login")
     
    }
    catch(error:any){
      console.log("signup Failed")
         toast.error(error.message)
    }
  }

  useEffect(()=>{
     if(user.username.length>0  && user.email.length>0 && user.password.length>0)
     {
      SetbuttonDisable(false)
     }
     else{
      SetbuttonDisable(true)
     }
  },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
       <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />

      <label htmlFor="username">username</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e)=>Setuser({...user,username:e.target.value})}
            placeholder="username"
            />


<label htmlFor="username">Email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e)=>Setuser({...user,email:e.target.value})}
            placeholder="username"
            />
   
   <label htmlFor="username">Password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="text"
            value={user.password}
            onChange={(e)=>Setuser({...user,password:e.target.value})}
            placeholder="username"
            />
               
            <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisable ? "No signup" : "Signup"}</button>
            <Link href="/login">Visit login page</Link>

      </div>
  )
}

 
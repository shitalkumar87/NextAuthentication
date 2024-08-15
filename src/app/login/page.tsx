'use client'
import  { useEffect, useState } from 'react'
import {toast} from "react-hot-toast"
import axios from "axios"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
 export default function  Login(){
  const [user,Setuser]=useState({
    
    email:"",
    password:""
  })

  const [buttonDisable,SetbuttonDisable,]=useState(false)
  const[loading,Setloading]=useState(false)

  const router=useRouter()

  const onLogin=async()=>{
    try{
   Setloading(true)
  const response=await axios.post("/api/users/login",user)
  console.log("login successfully",response.data)
  router.push("/profile")
     
    }
    catch(error:any){
      console.log("Login Failed")
         toast.error(error.message)
    }
  }

  useEffect(()=>{
     if(  user.email.length>0 && user.password.length>0)
     {
      SetbuttonDisable(false)
     }
     else{
      SetbuttonDisable(true)
     }
  },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
       <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />

   


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
               
               <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisable ? "No Login" : "Login"}</button>
            <Link href="/signup">Visit signup page</Link>

      </div>
  )
}

 
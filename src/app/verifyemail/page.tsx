"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function  verifyemail (){

  //const router=useRouter()

  const [token,SetToken]=useState("")
  const [verify,SetVerify]=useState(false)
  const [error,Seterror]=useState(false)

  const VerifyuserEmail=async()=>{
  try {
    await axios.post("/api/user/verifyemail",{token})
    SetVerify(true)
    Seterror(false)
  } catch (error:any) {
    Seterror(true)
    console.log(error.response.data)
  }

  }

  useEffect(()=>{
    Seterror(false)
  const urltoken=window.location.search.split("=")[1]
  SetToken(urltoken || " ")
  
  //  const {query}=router
  //  const urltokentwo=query.token
   
  },[])

  useEffect(()=>{
    Seterror(false)
  if(token.length>0){
    VerifyuserEmail()
  }
  },[])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
              <h1 className="text-4xl">Verify Email</h1>

              <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

              {
                verify && (
                  <div>
                  <h2 className="text-2xl">Email Verified</h2>
                  <Link href="/login">
                      Login
                  </Link>
              </div>

                  )}

                  {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    
                </div>
                   )}


    </div>
  )
}

 
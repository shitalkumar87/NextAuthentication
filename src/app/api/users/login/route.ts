import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel"
import {NextRequest,NextResponse} from "next/server"

import bcryptjs from "bcryptjs"

import jwt from "jsonwebtoken"

connect()


export async function POST(request:NextRequest){
     try{

        const reqBody=await request.json()
       const {email,password}=reqBody

       console.log(reqBody)

      const user= await User.findOne({email})

       if(!user){
        return  NextResponse.json( {message:"user doen not exists"},{status:400})
        
         
       }
       console.log("user Exist")

     const Validpassword= await bcryptjs.compare(password,user.password)

     if(!Validpassword){
        return  NextResponse.json( {message:"Check Your Credentials"},{status:400})
        
         
       }


       const tokendata={
        id:user._id,
        username:user.username,
        email:user.email
       }
     const token= await jwt.sign(tokendata,process.env.Token_Secret!,
         { expiresIn: "1d"});

         const response=NextResponse.json( {message:"Login Successfully",success:true} )

         response.cookies.set("token",token,{
            httpOnly:true
         })

         return response
     }
     catch(error:any){
        return  NextResponse.json( {error:error.message},{status:500})
     }
}


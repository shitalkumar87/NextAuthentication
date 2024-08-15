import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/GetdatafromToken";
import User from "@/models/usermodel"
import {NextRequest,NextResponse} from "next/server"
 

connect()


export async function POST(request:NextRequest){
     try{
       //extract data from token

   const userId=   await getDataFromToken(request)

    const user= await User.findOne({_id:userId}).select("-password")

    //check there is no user

    return  NextResponse.json( {message:"User Found",
        data:user
    })
      
     }
     catch(error:any){
        return  NextResponse.json( {error:error.message},{status:500})
     }
}

// import { NextRequest, NextResponse } from "next/server";
 
// import { connect } from "@/dbConfig/dbConfig";
// import { getDataFromToken } from "@/helpers/GetdatafromToken";
// import User from "@/models/usermodel";

// connect();

// export async function POST(request:NextRequest){

//     try {
//         const userId = await getDataFromToken (request);
//         const user = await User.findOne({_id: userId}).select("-password");
//         return NextResponse.json({
//             mesaaage: "User found",
//             data: user
//         })
//     } catch (error:any) {
//         return NextResponse.json({error: error.message}, {status: 400});
//     }

// }


 
import mongoose from "mongoose";


export async function connect(){
   try{
      mongoose.connect(process.env.MONGO_URL!)

      const connection=mongoose.connection
      connection.on('connected',()=>{
       
        console.log("MongoDb iS Connected")
      })

      connection.on('error',(err)=>{
        console.log("MongoDb Connection Error",err);
        process.exit();
      })
   }

   catch(error){
           console.log("Somenthing goes wrong!")

    console.log(error)
   }
   
}
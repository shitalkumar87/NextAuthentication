import User from "@/models/usermodel";
import nodemailer from 'nodemailer';
import bcryptjs from "bcryptjs"

export const SendEmail = async({email, emailType, userId}:any)=>{
    try{

        //Todo: configure mail for Usage
         
        const hashedToken=await bcryptjs.hash(userId.toString(),10)
        if(emailType === "VERIFY"){
             
            await User.findByIdAndUpdate(userId,
               {
                $set:{verifyToken:hashedToken,verifyTokenExpiry:Date.now() + 3600000}
               })

        } else if(emailType === "RESET"){
               
          await User.findByIdAndUpdate(userId,
             {
              $set:{forgetPasswordToken:hashedToken,forgetPasswordTokenExpiry:Date.now() + 3600000}
             })
        }


        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "3f08ca2656e015",
            pass: "f9ed4a4e7a189e"

             //TODO: add these credentials to .env file
          }
        });

          const Mailoptions={
            from:  "shitalsuman2024@gmail.com", 
            to:  email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.Domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.Domain}/verifyemail?token=${hashedToken}
            </p>`

            
          }
       const Mailresponse=   await transport.sendMail(Mailoptions)
       return Mailresponse
      
    }   
     catch(error:any){
            
        throw new error(error.message)
    }
}
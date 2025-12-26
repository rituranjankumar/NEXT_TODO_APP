"use server"
import { connectDB } from "@/lib/connectDB";
 
import bcrypt from "bcrypt";
import User from "@/models/userModel"
import { registerSchema } from "@/zodSchema/registerSchema"
import z from "zod"

export  async function registerUser(_,formdata)
{
    console.log("form data -> ",formdata)
    const result = registerSchema.safeParse(formdata);
    if(result?.error)
    {
        return  {
            error : z.flattenError(result?.error).fieldErrors,

        }
    }

     
         await connectDB();
   
    try {
     
        const user =await User.findOne({email:formdata.email})
        if(user)
        {
            return {
                error :  {
                     email: ["Email already exists"],
                }
            }
        }
    const hashedPassword = await bcrypt.hash(formdata.password, 10);
    await User.create({
         name:formdata.name,
         email:formdata.email,
         password:hashedPassword

       
    });
     return {
        success:true,
        message:"user registered successfully"
    }
     
  } catch (err) {
    console.log(err);
       
      return  {
       error: {
        _form: ["Something went wrong"],
      },
      }
      
     
  }

   
}
"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerSchema } from "@/zodSchema/registerSchema";
import z from "zod";
import { registerUser } from "@/serverActions/userActions";
import toast from "react-hot-toast";
export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("Rituranjan Singh");
  const [email, setEmail] = useState("ritu@gmail.com");
  const [password, setPassword] = useState("Ab123456");
  const [errors,setErrors]=useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [state,formAction,isPending] = useActionState(registerUser,{})

  useEffect(()=>
  {
    if(state.success)
    {
      setErrors({})
      setSuccessMessage(state.message)
      toast.success(state.message);
      router.push("/")
    }else{
      setErrors(state.error)
      setSuccessMessage("")
      if(state?.error?._form)
      {

        toast.error(state.error._form)
      }
    }
  },[state])
   
  const handleRegister = async (e) => {
    e.preventDefault();
    // const response = await fetch("/api/register", {
    //   method: "POST",
    //   body: JSON.stringify({ name, email, password }),
    // });
    // const data = await response.json();
    // console.log(data);
    // if (!data.error) {
    //   return router.push("/login");
    // }

    // console.log(e.target)

    // const formdata = new FormData(e.target)
    // console.log(formdata.get("name"))
    // validate the form 
    const result= registerSchema.safeParse({name,email,password})
    if(result?.error)
    {
      setSuccessMessage("");
      setErrors(z.flattenError(result?.error).fieldErrors)
    console.log("errors ", errors)
    return ;
  }

  // if true set the prev errors -> result.success
 
    setErrors({});

// console.log("validated data is -> ",result?.data)
    startTransition( ()=>
    {
      formAction(result?.data)
    
    
    })

         console.log("state is ->",state)

  }
  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-lg">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-purple-600">
            Todo App
          </h1>
        </header>
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleRegister} noValidate className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors?.name && <p className="text-red-900 text-xs">{errors?.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
            name="email"
              type="email"
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors?.email && <p className="text-red-700 text-xs">{errors?.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
            name="password"
              type="password"
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors?.password && <p className="text-red-900 text-xs">{errors?.password}</p>}
             {successMessage  && <p className="text-green-600">{successMessage }</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md font-medium hover:opacity-90"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

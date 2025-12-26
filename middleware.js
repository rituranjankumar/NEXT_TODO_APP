import { NextResponse } from "next/server";

export const middleware= (req)=>
{
        console.log("cookies is ->  ",req.cookies.get("sid")?.value);
        console.log("URL IS -> ",req.url)
        const cookie = req.cookies.get("sid")?.value;
        const path = req.nextUrl.pathname;
        const origin = req.nextUrl.origin;
            console.log("origin is -> ",origin);
if (cookie) {
     
    if (path === "/login" || path === "/register") {
      return NextResponse.redirect(new URL("/", origin));
    }

    return NextResponse.next();
  }

  
  // allow login and register pages for not logged in users
  if (path === "/login" || path === "/register") {
    return NextResponse.next();
  }

  // everything else → go to login
  return NextResponse.redirect(new URL("/login", origin));
};


 //  runnign middle ware for only login page
export const config ={
    matcher : ["/","/login","/register", ]
}
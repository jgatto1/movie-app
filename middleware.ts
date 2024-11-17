// middleware.js
import { NextRequest, NextResponse } from "next/server";
// import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  // const token = req.cookies.get("token");
  const url = req.nextUrl.clone();

  // TODO: Add token verification
  // if (!token) {
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }
  // Redirect root path to /movies
  console.log("url", url);

  if (url.pathname === "/") {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    // throw new Error("test");
    // comment out for now
    // jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    console.log("error", err);

    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/movies/:path*"], // Protect specific paths
};

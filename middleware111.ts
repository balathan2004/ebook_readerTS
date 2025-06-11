// import { NextRequest, NextResponse } from "next/server";

// export default function middleware(request: NextRequest) {
//   const { cookies, nextUrl } = request;
//   const EBookUserId = cookies.get("EBookUserId") ?? false;

//   const { pathname } = nextUrl;
//   console.log(pathname);

//   if (EBookUserId && pathname === "/") {
//     return NextResponse.redirect(new URL("/home", request.url));
//   }
//   if (!EBookUserId && (pathname == "/home" || pathname == "upload-book")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // Allow request to continue
//   return NextResponse.next();
// }

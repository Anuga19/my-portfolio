import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  if (pathname === "/fifa26") {
    return NextResponse.redirect(new URL("/fifa26/", request.url), 307);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/fifa26", "/fifa26/"],
};

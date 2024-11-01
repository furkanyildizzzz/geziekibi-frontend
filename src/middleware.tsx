import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.has("token")
    ? request.cookies.get("token")!.value
    : "";

  let decodedToken;
  try {
    decodedToken = jwtDecode(token);
  } catch (error) {
    // Invalid or missing token
    decodedToken = null;
  }

  const currentDate = new Date();
  const isExpired =
    !decodedToken || decodedToken.exp! * 1000 < currentDate.getTime();

  // Redirect to login if token is missing or expired and not already on an auth page
  if (isExpired && !path.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect to the main page if already authenticated and on an auth page
  if (!isExpired && path.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/tour/categories", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

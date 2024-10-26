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
    // Handle decoding errors (invalid token)
    decodedToken = null;
  }

  const currentDate = new Date();

  const isExpired =
    decodedToken && decodedToken.exp! * 1000 < currentDate.getTime();
  if (path.split("/")[1] !== "auth" && isExpired)
    return NextResponse.redirect(new URL("/auth/login", request.url));
  if (path.split("/")[1] === "auth" && !isExpired)
    return NextResponse.redirect(new URL(`/pages/sample_page`, request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

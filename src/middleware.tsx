  import { NextResponse } from "next/server";
  import type { NextRequest } from "next/server";
  import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Çerezleri kontrol et
  const tokenCookie = request.cookies.get("token");
  const token = tokenCookie?.value ?? "";
  let decodedToken: { exp?: number } | null = null;

  try {
    decodedToken = token ? jwtDecode<{ exp: number }>(token) : null;
  } catch (error) {
    decodedToken = null; // Token geçersizse yakala
  }

  const currentDate = new Date().getTime();
  const isExpired = !decodedToken?.exp || decodedToken.exp * 1000 < currentDate;

  console.log({ path });
  // Eğer token süresi dolmuşsa ve zaten "/auth" sayfasında değilse yönlendir
  if (isExpired && !path.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Eğer giriş yapılmışsa ve "/auth" sayfasındaysa, yönlendir
  if (!isExpired && path.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/tour/add_tour", request.url));
  }

  return NextResponse.next();
}

// API ve statik dosyalar hariç tüm sayfalarda çalıştır
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

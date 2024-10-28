import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface DecodedToken {
  exp: number;
}
export function isTokenExpired(): boolean {
  const token = Cookies.get("token");
  if (!token) return true;

  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Token decode error:", error);
    return true;
  }
}

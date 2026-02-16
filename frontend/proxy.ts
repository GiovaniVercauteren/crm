import { isClientSessionAuthenticated } from "@/lib/client-session";
import { NextRequest, NextResponse } from "next/server";

// Only allow access to public routes without authentication
const publicRoutes = ["/login", "/signup", "/forgot-password"];

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublicRoute = publicRoutes.includes(pathname);

  // Check if the request is for a public route
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For other routes, check if the user is authenticated
  const isAuthenticated = await isClientSessionAuthenticated();

  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    const loginUrl = new URL("/login", req.nextUrl);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated, allow the request to proceed
  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

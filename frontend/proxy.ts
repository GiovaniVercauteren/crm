import { NextRequest, NextResponse } from "next/server";
import { isAdmin, isAuthenticated } from "./lib/auth";

// Only allow access to public routes without authentication
const publicRoutes = ["/login", "/signup", "/forgot-password", "/verify"];
const adminRoutePrefix = "/admin";

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublicRoute = publicRoutes.includes(pathname);

  // Check if the request is for a public route
  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!(await isAuthenticated())) {
    // If not authenticated, redirect to the login page
    const loginUrl = new URL("/login", req.nextUrl);
    return NextResponse.redirect(loginUrl);
  }

  // If the user is authenticated but trying to access an admin route, check for admin privileges
  if (pathname.startsWith(adminRoutePrefix)) {
    // Here you would check if the user has admin privileges
    const hasAdminPrivileges = await isAdmin();

    if (!hasAdminPrivileges) {
      const notFoundUrl = new URL("/404", req.nextUrl);
      return NextResponse.rewrite(notFoundUrl);
    }
  }

  // If authenticated, allow the request to proceed
  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.ico$).*)",
  ],
};

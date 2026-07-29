import { NextRequest, NextResponse } from "next/server";
import checkAuth from "@/server/middleware/authMiddleware";

export function proxy(request: NextRequest) {
  const authResponse = checkAuth(request);

  if (authResponse) {
    return authResponse;
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*"],
};

import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export default function checkAuth(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return null;
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

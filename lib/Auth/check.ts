import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const isAuthenticated = async (req: NextRequest) => {
  const token = req.cookies.get("gtask.token")?.value;

  if (!token) {
    return false;
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    await jwtVerify(token, secret);

    return true;
  } catch {
    return false;
  }
};

export const isAdminAuthenticated = async (req: NextRequest) => {
  const token = req.cookies.get("gtask.admin.token")?.value;

  if (!token) {
    return false;
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    await jwtVerify(token, secret);

    return true;
  } catch {
    return false;
  }
};

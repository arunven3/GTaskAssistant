import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

const COOKIE_NAME = "gtask.token";
const MAX_AGE = 60 * 60 * 24 * 2;

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const signJwt = (payload: object): string => {
  const secret = process.env.JWT_SECRET!;
  return jwt.sign(payload, secret, { expiresIn: MAX_AGE });
};

export function verifyJwt(token: string) {
  const secret = process.env.JWT_SECRET!;
  return jwt.verify(token, secret) as {
    sub: string;
    email: string;
    iat: number;
    exp: number;
  };
}

export async function getAuthResponseCookie(
  id: string,
  email: string,
  res: NextResponse,
): Promise<NextResponse> {
  res.cookies.set({
    name: COOKIE_NAME,
    value: signJwt({ sub: id, email }),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
  });

  return res;
}

export async function getAdminAuthResponseCookie(
  id: string,
  email: string,
  res: NextResponse,
): Promise<NextResponse> {
  res.cookies.set({
    name: "gtask.admin.token",
    value: signJwt({ sub: id, email }),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1800,
  });

  return res;
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();

  console.log(
    cookieStore.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: MAX_AGE,
    }),
  );
}

export const clearAuthCookie = async (user: string) => {
  if (user === "client") (await cookies()).delete(COOKIE_NAME);
  else (await cookies()).delete("gtask.admin.token");
};

export async function getCurrentUser() {
  const cookie = (await cookies()).get(COOKIE_NAME);
  if (!cookie?.value) return null;

  try {
    const payload = verifyJwt(cookie.value);
    const user = await prisma.user.findUnique({
      where: { id: Number(payload.sub).toString() },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    return user;
  } catch {
    return null;
  }
}

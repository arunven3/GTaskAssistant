import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "gtask.token";
const MAX_AGE = 60 * 60 * 24 * 2;

export async function hashPassword(password: string) {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signJwt(payload: object) {
  const secret = process.env.JWT_SECRET!;
  return jwt.sign(payload, secret, { expiresIn: MAX_AGE });
}

export function verifyJwt(token: string) {
  const secret = process.env.JWT_SECRET!;
  return jwt.verify(token, secret) as {
    sub: string;
    email: string;
    iat: number;
    exp: number;
  };
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

export async function clearAuthCookie() {
  (await cookies()).delete(COOKIE_NAME);
}

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

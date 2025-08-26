import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminAuthResponseCookie, verifyPassword } from "@/lib/Auth/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    const user = await prisma.adminUser.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 },
      );
    }

    if (!user.password) {
      return NextResponse.json(
        {
          error:
            "This account was created with Google. Please sign in using Google.",
        },
        { status: 400 },
      );
    }

    if (!(await verifyPassword(password, user.password))) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });

    return await getAdminAuthResponseCookie(user.id, user.email, response);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}

import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret });

  if (!token?.accessToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const calendarRes = await fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList", {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  const data = await calendarRes.json();
  return res.status(200).json(data);
}

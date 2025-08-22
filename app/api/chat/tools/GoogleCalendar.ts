import { getServerSession } from "next-auth";
import { google } from "googleapis";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";

export const getGoogleCalendarEvents = async (toolData: any) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("User not authenticated");
    }

    const accessToken = session?.accessToken as string;
    if (!accessToken) {
      throw new Error("Google access token missing in session");
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: "v3", auth });

    console.log(toolData);
    const { start, end } = toolData.arguments;
    // console.log(toolData);

    const res = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date(start).toISOString(),
      timeMax: new Date(end).toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = res.data.items || [];

    return {
      events: events.map((e) => ({
        id: e.id,
        title: e.summary,
        start: e.start?.dateTime || e.start?.date,
        end: e.end?.dateTime || e.end?.date,
      })),
    };
  } catch (err: any) {
    console.error("Calendar fetch error:", err);
    return { error: err.message || "Failed to fetch calendar events" };
  }
};

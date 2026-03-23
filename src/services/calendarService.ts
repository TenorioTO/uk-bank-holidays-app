import * as Calendar from "expo-calendar";
import { Platform } from "react-native";
import { parseISO } from "date-fns";

export async function getDefaultCalendarId(): Promise<string | null> {
  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT,
  );

  const defaultCalendar =
    Platform.OS === "ios"
      ? calendars.find((c) => c.source.name === "Default")
      : calendars.find(
          (c) => c.accessLevel === Calendar.CalendarAccessLevel.OWNER,
        );

  return defaultCalendar?.id ?? calendars[0]?.id ?? null;
}

export async function requestCalendarAccess(): Promise<boolean> {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  return status === "granted";
}

export async function addEventToCalendar(
  title: string,
  date: string,
  notes: string,
): Promise<string> {
  const calendarId = await getDefaultCalendarId();

  if (!calendarId) {
    throw new Error("No calendar available on this device.");
  }

  const startDate = parseISO(date);

  return Calendar.createEventAsync(calendarId, {
    title,
    startDate,
    endDate: startDate,
    allDay: true,
    notes,
  });
}

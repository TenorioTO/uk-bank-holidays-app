import { useCallback, useState } from "react";
import { Alert, Linking } from "react-native";
import {
  requestCalendarAccess,
  addEventToCalendar,
} from "../services/calendarService";

type Status = "idle" | "saving" | "saved" | "denied";

export function useAddToCalendar() {
  const [status, setStatus] = useState<Status>("idle");

  const addToCalendar = useCallback(
    async (title: string, date: string, notes: string) => {
      setStatus("saving");

      const granted = await requestCalendarAccess();

      if (!granted) {
        setStatus("denied");
        Alert.alert(
          "Calendar Permission Required",
          "Please enable calendar access in your device settings to add holidays.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ],
        );
        return;
      }

      try {
        await addEventToCalendar(title, date, notes);
        setStatus("saved");
      } catch {
        setStatus("idle");
        Alert.alert("Error", "Could not add event to calendar.");
      }
    },
    [],
  );

  return { addToCalendar, status };
}

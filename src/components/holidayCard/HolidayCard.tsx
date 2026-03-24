import { format, parseISO } from "date-fns";
import { View, Text, Pressable } from "react-native";
import { styles } from "./holidayStyles";
import { BankHolidayEvent } from "../../types/bankHolidays";
import { useAddToCalendar } from "../../hooks/useAddToCalendar";

interface HolidayCardProps {
  holiday: BankHolidayEvent;
  onEdit: (holiday: BankHolidayEvent) => void;
}

export default function HolidayCard({ holiday, onEdit }: HolidayCardProps) {
  const formattedDate = format(parseISO(holiday.date), "EEEE, d MMMM yyyy");
  const { addToCalendar, status } = useAddToCalendar();

  const isSaved = status === "saved";

  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{holiday.title}</Text>
        {holiday.bunting && <View style={styles.buntingBadge} />}
      </View>
      <Text style={styles.date}>{formattedDate}</Text>
      {holiday.notes !== "" && (
        <Text style={styles.notes}>{holiday.notes}</Text>
      )}
      <View style={styles.cardActions}>
        <Pressable
          style={[styles.button, styles.editButton]}
          onPress={() => onEdit(holiday)}
        >
          <Text style={[styles.buttonText, styles.editButtonText]}>Edit</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            styles.calendarButton,
            isSaved && styles.buttonSaved,
          ]}
          onPress={() =>
            addToCalendar(holiday.title, holiday.date, holiday.notes)
          }
          disabled={isSaved || status === "saving"}
        >
          <Text style={[styles.buttonText, isSaved && styles.buttonTextSaved]}>
            {status === "saving"
              ? "Saving..."
              : isSaved
                ? "Added to Calendar"
                : "Add to Calendar"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

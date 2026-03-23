import { format, parseISO } from "date-fns";
import { View, Text } from "react-native";
import { styles } from "./holidayStyles";
import { BankHolidayEvent } from "../../types/bankHolidays";

export default function HolidayCard({
  holiday,
}: {
  holiday: BankHolidayEvent;
}) {
  const formattedDate = format(parseISO(holiday.date), "EEEE, d MMMM yyyy");

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{holiday.title}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
      {holiday.notes !== "" && (
        <Text style={styles.notes}>{holiday.notes}</Text>
      )}
    </View>
  );
}

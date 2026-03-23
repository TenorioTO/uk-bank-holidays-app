import { useState, useCallback } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import Container from "../components/container/Container";
import { useBankHolidays } from "../hooks/useBankHolidays";
import { useHolidayEdits } from "../context/HolidayEditsContext";
import { styles } from "./indexStyles";
import HolidayCard from "../components/holidayCard/HolidayCard";
import EditHolidayModal from "../components/editHolidayModal/EditHolidayModal";
import { BankHolidayEvent } from "../types/bankHolidays";

export default function Index() {
  const { data, isPending, isError } = useBankHolidays();
  const { applyEdits, updateHoliday } = useHolidayEdits();
  const [editing, setEditing] = useState<BankHolidayEvent | null>(null);

  const handleSave = useCallback(
    (updated: BankHolidayEvent) => {
      if (!editing) return;
      const originalKey = `${editing.date}|${editing.title}`;
      updateHoliday(originalKey, updated);
    },
    [editing, updateHoliday],
  );

  if (isPending) {
    return (
      <Container style={styles.centered}>
        <ActivityIndicator testID="loading-indicator" size="large" />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container style={styles.centered}>
        <Text>Something went wrong. Please try again later.</Text>
      </Container>
    );
  }

  const holidays = applyEdits(data ?? []);

  return (
    <Container>
      <FlatList
        data={holidays}
        keyExtractor={(item) => `${item.date}-${item.title}`}
        renderItem={({ item }) => (
          <HolidayCard holiday={item} onEdit={setEditing} />
        )}
      />
      {editing && (
        <EditHolidayModal
          holiday={editing}
          visible
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </Container>
  );
}

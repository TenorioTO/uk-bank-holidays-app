import { ActivityIndicator, FlatList, Text } from "react-native";
import Container from "../components/container/Container";
import { useBankHolidays } from "../hooks/useBankHolidays";
import { styles } from "./indexStyles";
import HolidayCard from "../components/holidayCard/HolidayCard";

export default function Index() {
  const { data, isPending, isError } = useBankHolidays();

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

  return (
    <Container>
      <FlatList
        data={data}
        keyExtractor={(item) => `${item.date}-${item.title}`}
        renderItem={({ item }) => <HolidayCard holiday={item} />}
      />
    </Container>
  );
}

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import QueryProvider from "../providers/QueryProvider";
import { HolidayEditsProvider } from "../context/HolidayEditsContext";
import { Colors } from "../theme/variables";
import { styles } from "./layoutStyles";

export default function RootLayout() {
  return (
    <QueryProvider>
      <HolidayEditsProvider>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerStyle: styles.header,
              headerTintColor: Colors.white,
              headerTitleStyle: styles.headerTitle,
              contentStyle: styles.content,
            }}
          >
            <Stack.Screen
              name="index"
              options={{ title: "UK Bank Holidays" }}
            />
            <StatusBar style="light" />
          </Stack>
        </SafeAreaProvider>
      </HolidayEditsProvider>
    </QueryProvider>
  );
}

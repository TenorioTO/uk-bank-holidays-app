import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import QueryProvider from "../providers/QueryProvider";

export default function RootLayout() {
  return (
    <QueryProvider>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "UK Bank Holidays" }} />
          <StatusBar style="auto" />
        </Stack>
      </SafeAreaProvider>
    </QueryProvider>
  );
}

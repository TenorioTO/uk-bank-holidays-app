import { render, RenderOptions } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const SAFE_AREA_METRICS = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

export function renderScreen(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, {
    wrapper: ({ children }) => (
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        {children}
      </SafeAreaProvider>
    ),
    ...options,
  });
}

import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./containerStyles";

export default function Container({
  style,
  children,
}: {
  style?: object;
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
}

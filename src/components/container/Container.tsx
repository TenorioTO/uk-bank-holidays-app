import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./containerStyles";
import { View } from "react-native";

export default function Container({
  style,
  children,
}: {
  style?: object;
  children: React.ReactNode;
}) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: bottom }, style]}>
      {children}
    </View>
  );
}

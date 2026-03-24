import { StyleSheet } from "react-native";
import { Colors, FontSize } from "../theme/variables";

export const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.navy,
  },
  headerTitle: {
    fontWeight: "700",
    fontSize: FontSize.titles,
  },
  content: {
    backgroundColor: Colors.background,
  },
});

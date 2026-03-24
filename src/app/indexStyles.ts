import { StyleSheet } from "react-native";
import { Colors, FontSize, Spacing } from "../theme/variables";

export const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  listHeader: {
    marginBottom: Spacing.medium,
  },
  subtitle: {
    fontSize: FontSize.regular,
    color: Colors.textSecondary,
    marginBottom: Spacing.small,
  },
});

import { StyleSheet } from "react-native";
import { FontSize, Spacing } from "../../theme/variables";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f9fa",
    borderRadius: Spacing.small,
    padding: Spacing.medium,
    marginBottom: Spacing.small,
  },
  title: {
    fontSize: FontSize.titles,
    fontWeight: "600",
  },
  date: {
    fontSize: FontSize.regular,
    color: "#555",
    marginTop: Spacing.xSmall,
  },
  notes: {
    fontSize: FontSize.regular,
    color: "#888",
    marginTop: Spacing.xSmall,
    fontStyle: "italic",
  },
});

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
  cardActions: {
    flexDirection: "row" as const,
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  button: {
    borderRadius: Spacing.xSmall,
    paddingVertical: Spacing.small,
    alignItems: "center" as const,
  },
  editButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: Spacing.medium,
  },
  editButtonText: {
    color: "#333",
  },
  calendarButton: {
    flex: 1,
    backgroundColor: "#007AFF",
  },
  buttonSaved: {
    backgroundColor: "#e8f5e9",
  },
  buttonText: {
    color: "#fff",
    fontSize: FontSize.regular,
    fontWeight: "600" as const,
  },
  buttonTextSaved: {
    color: "#2e7d32",
  },
});

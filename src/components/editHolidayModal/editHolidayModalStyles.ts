import { StyleSheet } from "react-native";
import { FontSize, Spacing } from "../../theme/variables";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: Spacing.large,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: Spacing.small,
    padding: Spacing.large,
  },
  heading: {
    fontSize: FontSize.large,
    fontWeight: "700",
    marginBottom: Spacing.medium,
  },
  label: {
    fontSize: FontSize.regular,
    fontWeight: "600",
    marginTop: Spacing.small,
    marginBottom: Spacing.xSmall,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: Spacing.xSmall,
    padding: Spacing.small,
    fontSize: FontSize.regular,
  },
  inputError: {
    borderColor: "#d32f2f",
  },
  error: {
    color: "#d32f2f",
    fontSize: 13,
    marginTop: Spacing.xSmall,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: Spacing.large,
    gap: Spacing.small,
  },
  cancelButton: {
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.medium,
    borderRadius: Spacing.xSmall,
  },
  cancelText: {
    fontSize: FontSize.regular,
    color: "#555",
  },
  saveButton: {
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.medium,
    backgroundColor: "#007AFF",
    borderRadius: Spacing.xSmall,
  },
  saveText: {
    fontSize: FontSize.regular,
    color: "#fff",
    fontWeight: "600",
  },
});

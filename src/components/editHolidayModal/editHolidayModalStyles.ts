import { StyleSheet } from "react-native";
import { BorderRadius, Colors, FontSize, Spacing } from "../../theme/variables";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.large,
    borderTopRightRadius: BorderRadius.large,
    padding: Spacing.large,
    paddingTop: Spacing.xLarge,
  },
  heading: {
    fontSize: FontSize.xLarge,
    fontWeight: "700",
    color: Colors.navy,
    marginBottom: Spacing.large,
  },
  label: {
    fontSize: FontSize.regular,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginTop: Spacing.medium,
    marginBottom: Spacing.xSmall,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.small,
    padding: Spacing.regular,
    fontSize: FontSize.regular,
    backgroundColor: Colors.background,
  },
  inputError: {
    borderColor: Colors.error,
  },
  error: {
    color: Colors.error,
    fontSize: FontSize.small,
    marginTop: Spacing.xSmall,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: Spacing.xLarge,
    gap: Spacing.small,
  },
  cancelButton: {
    paddingVertical: Spacing.regular,
    paddingHorizontal: Spacing.large,
    borderRadius: BorderRadius.small,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelText: {
    fontSize: FontSize.regular,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  saveButton: {
    paddingVertical: Spacing.regular,
    paddingHorizontal: Spacing.large,
    backgroundColor: Colors.navy,
    borderRadius: BorderRadius.small,
  },
  saveText: {
    fontSize: FontSize.regular,
    color: Colors.white,
    fontWeight: "600",
  },
});

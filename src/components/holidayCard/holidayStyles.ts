import { Platform, StyleSheet } from "react-native";
import { BorderRadius, Colors, FontSize, Spacing } from "../../theme/variables";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.medium,
    padding: Spacing.large,
    marginBottom: Spacing.regular,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: Spacing.small,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  title: {
    fontSize: FontSize.large,
    fontWeight: "700",
    color: Colors.textPrimary,
    flex: 1,
  },
  buntingBadge: {
    backgroundColor: Colors.gold,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  date: {
    fontSize: FontSize.regular,
    color: Colors.textSecondary,
    marginTop: Spacing.small,
  },
  notes: {
    fontSize: FontSize.regular,
    color: Colors.textMuted,
    marginTop: Spacing.xSmall,
    fontStyle: "italic",
  },
  cardActions: {
    flexDirection: "row",
    gap: Spacing.small,
    marginTop: Spacing.medium,
  },
  button: {
    borderRadius: BorderRadius.small,
    paddingVertical: Spacing.regular,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.medium,
  },
  editButtonText: {
    color: Colors.textSecondary,
  },
  calendarButton: {
    flex: 1,
    backgroundColor: Colors.navy,
  },
  buttonSaved: {
    backgroundColor: Colors.successLight,
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSize.regular,
    fontWeight: "600",
  },
  buttonTextSaved: {
    color: Colors.success,
  },
});

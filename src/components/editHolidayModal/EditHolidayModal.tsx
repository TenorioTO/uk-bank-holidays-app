import { useState } from "react";
import { Modal, View, Text, TextInput, Pressable } from "react-native";
import { styles } from "./editHolidayModalStyles";
import { BankHolidayEvent } from "../../types/bankHolidays";
import { validateHolidayEdit } from "../../utils/validateHolidayEdit";

interface EditHolidayModalProps {
  holiday: BankHolidayEvent;
  visible: boolean;
  onClose: () => void;
  onSave: (updated: BankHolidayEvent) => void;
}

export default function EditHolidayModal({
  holiday,
  visible,
  onClose,
  onSave,
}: EditHolidayModalProps) {
  const [title, setTitle] = useState(holiday.title);
  const [date, setDate] = useState(holiday.date);
  const [notes, setNotes] = useState(holiday.notes);
  const [errors, setErrors] = useState<{ title?: string; date?: string }>({});

  const handleSave = () => {
    const { valid, errors: validationErrors } = validateHolidayEdit(
      title,
      date,
    );

    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    onSave({ ...holiday, title: title.trim(), date, notes });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.heading}>Edit Holiday</Text>

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={[styles.input, errors.title ? styles.inputError : undefined]}
            value={title}
            onChangeText={(value) => {
              setTitle(value);
              setErrors((prev) => ({ ...prev, title: undefined }));
            }}
            placeholder="Holiday title"
          />
          {errors.title && <Text style={styles.error}>{errors.title}</Text>}

          <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
          <TextInput
            style={[styles.input, errors.date ? styles.inputError : undefined]}
            value={date}
            onChangeText={(value) => {
              setDate(value);
              setErrors((prev) => ({ ...prev, date: undefined }));
            }}
            placeholder="2026-04-03"
          />
          {errors.date && <Text style={styles.error}>{errors.date}</Text>}

          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={styles.input}
            value={notes}
            onChangeText={setNotes}
            placeholder="Optional notes"
          />

          <View style={styles.actions}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import { BankHolidayEvent } from "../types/bankHolidays";

type Edits = Record<string, BankHolidayEvent>;

type Action =
  | { type: "UPDATE"; originalKey: string; updated: BankHolidayEvent }
  | { type: "CLEAR" };

const EditsContext = createContext<{
  applyEdits: (holidays: BankHolidayEvent[]) => BankHolidayEvent[];
  updateHoliday: (originalKey: string, updated: BankHolidayEvent) => void;
  clearEdits: () => void;
} | null>(null);

function editsReducer(state: Edits, action: Action): Edits {
  switch (action.type) {
    case "UPDATE":
      return { ...state, [action.originalKey]: action.updated };
    case "CLEAR":
      return {};
  }
}

export function HolidayEditsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [edits, dispatch] = useReducer(editsReducer, {});

  const applyEdits = useCallback(
    (holidays: BankHolidayEvent[]): BankHolidayEvent[] =>
      holidays.map((h) => {
        const key = `${h.date}|${h.title}`;
        return edits[key] ?? h;
      }),
    [edits],
  );

  const updateHoliday = useCallback(
    (originalKey: string, updated: BankHolidayEvent) => {
      dispatch({ type: "UPDATE", originalKey, updated });
    },
    [],
  );

  const clearEdits = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const value = useMemo(
    () => ({ applyEdits, updateHoliday, clearEdits }),
    [applyEdits, updateHoliday, clearEdits],
  );

  return (
    <EditsContext.Provider value={value}>{children}</EditsContext.Provider>
  );
}

export function useHolidayEdits() {
  const context = useContext(EditsContext);
  if (!context) {
    throw new Error("useHolidayEdits must be used within HolidayEditsProvider");
  }
  return context;
}

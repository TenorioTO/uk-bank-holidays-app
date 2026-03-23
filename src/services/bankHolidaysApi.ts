import { BankHolidaysResponse } from "../types/bankHolidays";

const BANK_HOLIDAYS_URL = "https://www.gov.uk/bank-holidays.json";

export async function fetchBankHolidays(): Promise<BankHolidaysResponse> {
  const response = await fetch(BANK_HOLIDAYS_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch bank holidays: ${response.status}`);
  }

  return response.json();
}

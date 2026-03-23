import { useQuery } from "@tanstack/react-query";
import { fetchBankHolidays } from "../services/bankHolidaysApi";
import { getUpcomingHolidays } from "../utils/getUpcomingHolidays";

export function useBankHolidays() {
  return useQuery({
    queryKey: ["bankHolidays"],
    queryFn: fetchBankHolidays,
    select: getUpcomingHolidays,
  });
}

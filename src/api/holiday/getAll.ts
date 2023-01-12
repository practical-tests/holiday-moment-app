import { HolidayApi } from "../../types";
import instanceHoliday from "./instance";

const getAll = async (): Promise<HolidayApi[]> => {
  const response = await instanceHoliday.get<HolidayApi[]>(`nacionais.json`);
  return response.data;
};

export { getAll };

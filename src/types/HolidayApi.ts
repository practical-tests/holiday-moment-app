export interface HolidayApi {
  date?: string;
  title: string;
  description: string;
  legislation: string;
  type: "feriado";
  startTime: string;
  endTime: string;
  variableDates: { [key: string]: string };
}

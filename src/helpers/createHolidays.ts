import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

const customParseFormat = require("dayjs/plugin/customParseFormat");

dayjs.extend(customParseFormat);

import { Holiday, HolidayApi } from "../types";

const fromApi = (holidayApi: HolidayApi): Holiday[] => {
  const currentYear = dayjs().year();
  if (!!holidayApi.date)
    return [
      {
        id: uuidv4(),
        date: dayjs(`${holidayApi.date}/${currentYear}`, `DD/MM/YYYY`).toDate(),
        description: holidayApi.description,
        legislation: holidayApi.legislation,
        title: holidayApi.title,
        type: holidayApi.type,
      },
    ];

  const dates = Object.entries(holidayApi.variableDates).map(
    ([key, value]) => `${value}/${key}`
  );

  return dates.map((item) => ({
    id: uuidv4(),
    date: dayjs(item, `DD/MM/YYYY`).toDate(),
    description: holidayApi.description,
    legislation: holidayApi.legislation,
    title: holidayApi.title,
    type: holidayApi.type,
  }));
};

const fromApiArray = (holidaysApi: HolidayApi[]): Holiday[] => {
  return holidaysApi.map(fromApi).flat();
};

const createHolidays = {
  fromApiArray,
  fromApi,
};

export { createHolidays };

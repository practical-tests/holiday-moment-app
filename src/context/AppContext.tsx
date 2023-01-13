import { useCallback } from "react";
import { Center } from "native-base";
import { createContext, useMemo } from "react";

import { API } from "../api";
import { Holiday } from "../types";
import { Storage } from "../utils";
import { createHolidays } from "../helpers";
import { Loading } from "../components/Loading";
import { usePromise } from "../hooks";

interface TypeContext {
  holidayDb: Storage<Holiday>;
}

export const AppContext = createContext<TypeContext>(null!);

type AppContextProviderProps = {
  children: React.ReactNode;
};

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const holidayDb = useMemo(() => new Storage<Holiday>(`holidays`), []);

  const fetchHolidays = useCallback(async () => {
    const keys = await holidayDb.getKeys();
    if (keys && keys.length > 0) return false;
    const request = await API.holiday.getAll();
    const holidays = createHolidays.fromApiArray(request);
    await Promise.all(holidays.map((item) => holidayDb.insert(item.id, item)));
    return true;
  }, []);

  const { loading } = usePromise(fetchHolidays, { callOnStart: true });

  if (loading.isLoading)
    return (
      <Center height="full">
        <Loading />
      </Center>
    );

  return (
    <AppContext.Provider
      value={{
        holidayDb,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider };

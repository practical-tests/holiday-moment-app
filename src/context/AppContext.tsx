import { Center } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useState, createContext, useMemo } from "react";

import { API } from "../api";
import { Holiday } from "../types";
import { Storage } from "../utils";
import { usePromise } from "../hooks";
import { createHolidays } from "../helpers";
import { Loading } from "../components/Loading";
import { AppHeader } from "../components/AppHeader";

interface TypeContext {
  holidayDb: Storage<Holiday>;
  setTitle: (title: string) => void;
}

export const AppContext = createContext<TypeContext>(null!);

type AppContextProviderProps = {
  children: React.ReactNode;
};

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const navigation = useNavigation();

  const [title, setTitle] = useState("Feed");
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
        setTitle,
      }}
    >
      <AppHeader
        title={title}
        canGoBack={navigation.canGoBack()}
        goBack={navigation.goBack}
      />
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider };

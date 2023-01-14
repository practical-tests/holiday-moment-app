import { useNavigation } from "@react-navigation/native";
import { useCallback, useState, createContext, useMemo } from "react";
import { Box, Center, Flex, HStack, Pressable, Text } from "native-base";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { API } from "../api";
import { Holiday } from "../types";
import { Storage } from "../utils";
import { createHolidays } from "../helpers";
import { Loading } from "../components/Loading";
import { usePromise } from "../hooks";

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
      <HStack
        bg="#117cfd"
        px="1"
        pb="2"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <Box w="10">
          {navigation.canGoBack() && (
            <Pressable
              w="full"
              alignItems="center"
              justifyContent="center"
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={20}
                color="white"
              />
            </Pressable>
          )}
        </Box>
        <Flex alignItems="center" justifyContent="center" flex="1">
          <Text color="white" fontSize="20" fontFamily="Poppins_700Bold">
            {title}
          </Text>
        </Flex>
        <Box w="10" />
      </HStack>
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider };

import { useContext, useCallback, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Box,
  Center,
  Divider,
  FlatList,
  Menu,
  Pressable,
  Text,
} from "native-base";

import { FeedItem } from "./FeedItem";
import { Holiday } from "../../types";
import { usePromise } from "../../hooks";
import { RootRoutesType } from "../types";
import { AppContext } from "../../context";
import { Loading } from "../../components/Loading";

interface HomeProps extends NativeStackScreenProps<RootRoutesType, "Home"> {}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { holidayDb, setTitle } = useContext(AppContext);

  const {
    data,
    loading,
    call: fetchHolidays,
  } = usePromise(
    async () => {
      const data = await holidayDb.getAll();
      return data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    },
    { callOnStart: true }
  );

  const removeHoliday = useCallback(async (holiday: Holiday) => {
    loading.setIsLoading(true);
    await holidayDb.remove(holiday.id);
    await fetchHolidays();
  }, []);

  useEffect(() => {
    setTitle("Feed");
  }, []);

  return (
    <>
      {loading.isLoading && (
        <>
          <Box
            backgroundColor={"gray.100"}
            style={{
              opacity: 0.4,
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 5,
            }}
          ></Box>
          <Center
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 10,
            }}
          >
            <Loading />
          </Center>
        </>
      )}

      <FlatList
        data={data || []}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <FeedItem
            key={item.item.id}
            item={item.item}
            menu={
              <Menu
                trigger={(triggerProps) => {
                  return (
                    <Pressable
                      accessibilityLabel="More options menu"
                      {...triggerProps}
                    >
                      <MaterialCommunityIcons
                        name="dots-vertical"
                        size={20}
                        color="#73757d"
                      />
                    </Pressable>
                  );
                }}
              >
                <Menu.Item
                  onPress={() =>
                    navigation.navigate("EditHoliday", { id: item.item.id })
                  }
                >
                  Editar
                </Menu.Item>
                <Menu.Item>Registar momento</Menu.Item>
                <Divider />
                <Menu.Item onPress={() => removeHoliday(item.item)}>
                  <Text color="red.500">Remover</Text>
                </Menu.Item>
              </Menu>
            }
          />
        )}
      />

      {/* 
      {showFull && (
        <>
          <Box
            backgroundColor={"gray.900"}
            style={{
              opacity: 0.5,
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 5,
            }}
          />
          <Center
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 10,
            }}
          >
            <Text>Leo</Text>
          </Center>
        </>
      )} */}
    </>
  );
};

export { Home };

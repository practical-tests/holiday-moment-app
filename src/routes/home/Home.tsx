import { useContext, useState, useCallback, useEffect } from "react";
import {
  Box,
  Center,
  Divider,
  FlatList,
  Menu,
  Pressable,
  Text,
} from "native-base";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { FeedItem } from "./FeedItem";
import { AppContext } from "../../context";
import { Loading } from "../../components/Loading";
import { Holiday } from "../../types";

const Home = () => {
  const { holidayDb } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Holiday[]>([]);

  const fetchHolidays = useCallback(async () => {
    setIsLoading(true);
    const data = await holidayDb.getAll();
    setData(
      data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    );
    setIsLoading(false);
  }, []);

  const removeHoliday = useCallback(async (holiday: Holiday) => {
    setIsLoading(true);
    await holidayDb.remove(holiday.id);
    await fetchHolidays();
  }, []);

  useEffect(() => {
    fetchHolidays();
  }, []);

  return (
    <>
      {isLoading && (
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
                <Menu.Item>Editar</Menu.Item>
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

      {/* <Box width={"full"} borderRadius="md" backgroundColor="lightBlue.50">
        <Box marginBottom={"1.5"} padding={2}>
          <Flex
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Text bold>Confraternização Universal</Text>
            <Flex direction="row">
              <Badge colorScheme="success" marginRight={3}>
                Feriado
              </Badge>
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
                <Menu.Item>Editar</Menu.Item>
                <Menu.Item>Registar momento</Menu.Item>
                <Divider />
                <Menu.Item>Remover</Menu.Item>
              </Menu>
            </Flex>
          </Flex>
        </Box>
        <Box>
          <Badge
            backgroundColor="lightBlue.50"
            borderBottomRightRadius="xl"
            width={24}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 10,
            }}
          >
            01/01/2023
          </Badge>
          {assets && (
            <Pressable
              onLongPress={() => setShowFull(true)}
              onPressOut={() => setShowFull(false)}
            >
              <Image
                source={{ uri: assets[0].uri }}
                resizeMode="cover"
                height={"48"}
                marginTop={"1"}
                marginBottom="1"
                alt="Confraternização Universal"
              />
            </Pressable>
          )}
        </Box>
        <Divider backgroundColor="blue.100" />
        <Box>
          <Text
            color="gray.800"
            fontSize={"xs"}
            isTruncated
            noOfLines={2}
            padding={2}
          >
            Início do ano civil, Dia Mundial da Paz, além de Dia da Fraternidade
            Universal, sendo assim, um feriado internacional, adotado por quase
            todas as nações do planeta.
          </Text>
        </Box>
        <Divider backgroundColor="blue.100" />
      </Box>
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

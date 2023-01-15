import { Box, Center, FlatList } from "native-base";
import { useContext, useCallback, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Holiday } from "../../types";
import { usePromise } from "../../hooks";
import { RootRoutesType } from "../types";
import { AppContext } from "../../context";
import { Loading } from "../../components/Loading";
import { FeedItem, PreviewFeed, FeedItemMenu } from "./components";

interface HomeProps extends NativeStackScreenProps<RootRoutesType, "Home"> {}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { holidayDb, setTitle } = useContext(AppContext);
  const [currentPress, setCurrentPress] = useState<Holiday | undefined>(
    undefined
  );

  const {
    data,
    loading,
    call: fetchHolidays,
  } = usePromise(async () => {
    const data = await holidayDb.getAll();
    return data.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  });

  const removeHoliday = useCallback(async (id: string) => {
    loading.setIsLoading(true);
    await holidayDb.remove(id);
    await fetchHolidays();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setTitle("Feed");
      fetchHolidays();
    });
    return unsubscribe;
  }, []);

  return (
    <>
      {loading.isLoading && (
        <>
          <Box
            backgroundColor="gray.100"
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
            handlePreview={setCurrentPress}
            menu={
              <FeedItemMenu
                handleRemove={removeHoliday}
                holidayId={item.item.id}
                navigate={navigation.navigate}
              />
            }
          />
        )}
      />
      <PreviewFeed item={currentPress} />
    </>
  );
};

export { Home };

import dayjs from "dayjs";
import { useAssets } from "expo-asset";
import {
  AspectRatio,
  Badge,
  Box,
  Divider,
  Flex,
  Image,
  Pressable,
  Text,
} from "native-base";

import { Holiday } from "../../../types";

interface FeedItemProps {
  item: Holiday;
  menu?: React.ReactNode;
  handlePreview: (item: Holiday | undefined) => void;
}

const FeedItem: React.FC<FeedItemProps> = ({ item, menu, handlePreview }) => {
  const [defaultImage] = useAssets(require("../../../../assets/holiday.jpg"));

  return (
    <Box w="full" borderRadius="md" backgroundColor="lightBlue.50">
      <Box mb="1.5" p="2">
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text bold>{item.title}</Text>
          <Flex direction="row">
            <Badge colorScheme="darkBlue" mr="3">
              Feriado
            </Badge>
            {menu}
          </Flex>
        </Flex>
      </Box>

      <Box>
        <Badge
          backgroundColor="lightBlue.50"
          borderRightRadius="xl"
          w="24"
          style={{ position: `absolute`, top: 0, left: 0, zIndex: 10 }}
        >
          {dayjs(item.date).format("DD/MM/YYYY")}
        </Badge>
        {item.latitude && item.longitude && (
          <Badge
            backgroundColor="lightBlue.50"
            borderLeftRadius="xl"
            w="24"
            style={{
              position: `absolute`,
              bottom: 0,
              right: 0,
              zIndex: 10,
            }}
          >
            <Text>{item.latitude}</Text>
            <Text>{item.longitude}</Text>
          </Badge>
        )}
        {defaultImage && (
          <Pressable
            onLongPress={() => handlePreview(item)}
            onPressOut={() => handlePreview(undefined)}
          >
            <AspectRatio ratio={1}>
              <Image
                resizeMode="cover"
                mt="1"
                mb="1"
                source={{
                  uri: item.photo || defaultImage[0].uri,
                }}
                alt="Confraternização Universal"
              />
            </AspectRatio>
          </Pressable>
        )}
      </Box>
      <Divider bg="blue.100" />
      <Box>
        <Text color="gray.800" fontSize="xs" isTruncated noOfLines={1} p="2">
          {item.description}
        </Text>
      </Box>
    </Box>
  );
};

export { FeedItem };

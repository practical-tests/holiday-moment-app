import dayjs from "dayjs";
import { useAssets } from "expo-asset";
import {
  AspectRatio,
  Box,
  Center,
  Divider,
  Flex,
  Image,
  Text,
} from "native-base";

import { Holiday } from "../../../types";

interface PreviewFeedProps {
  item?: Holiday;
}

const PreviewFeed: React.FC<PreviewFeedProps> = ({ item }) => {
  const [defaultImage] = useAssets(require("../../../../assets/holiday.jpg"));
  if (!item) return <></>;

  return (
    <>
      <Box
        backgroundColor="gray.900"
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
        <Box w="full" borderRadius="md" backgroundColor="lightBlue.50">
          <Flex
            mb="1.5"
            p="2"
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Text bold>{item.title}</Text>
          </Flex>

          <Box>
            {defaultImage && (
              <AspectRatio ratio={1}>
                <Image
                  resizeMode="cover"
                  my="1"
                  source={{
                    uri: item.photo || defaultImage[0].uri,
                  }}
                  alt="Confraternização Universal"
                />
              </AspectRatio>
            )}
          </Box>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="xs" color="gray.500">
              Data: {dayjs(item.date).format("DD/MM/YYYY")}
            </Text>
            {item.latitude && item.longitude && (
              <Text fontSize="xs" color="gray.500">
                Localização: {item.latitude}, {item.longitude}
              </Text>
            )}
          </Flex>
          <Divider backgroundColor="blue.100" />

          <Text color="gray.800" fontSize="md" p="2">
            {item.description}
          </Text>
          <Text color="gray.800" fontSize="xs" isTruncated noOfLines={2} p="2">
            {item.legislation}
          </Text>
        </Box>
      </Center>
    </>
  );
};

export { PreviewFeed };

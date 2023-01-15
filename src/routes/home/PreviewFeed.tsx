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

import { Holiday } from "../../types";

interface PreviewFeedProps {
  item?: Holiday;
}

const PreviewFeed: React.FC<PreviewFeedProps> = ({ item }) => {
  const [defaultImage] = useAssets(require("../../../assets/holiday.jpg"));
  if (!item) return <></>;

  return (
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
        <Box {...styles.container}>
          <Flex {...styles.headerRow}>
            <Text bold>{item.title}</Text>
          </Flex>

          <Box>
            {defaultImage && (
              <AspectRatio ratio={1}>
                <Image
                  {...styles.contentImage}
                  source={{
                    uri: item.photo || defaultImage[0].uri,
                  }}
                  alt="Confraternização Universal"
                />
              </AspectRatio>
            )}
          </Box>
          <Flex {...styles.infoRow}>
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

          <Text {...styles.contentText}>{item.description}</Text>
          <Text {...styles.contentTextDescription}>{item.legislation}</Text>
        </Box>
      </Center>
    </>
  );
};

const styles = {
  container: {
    width: `full`,
    borderRadius: `md`,
    backgroundColor: `lightBlue.50`,
  },
  headerRow: {
    marginBottom: 1.5,
    padding: 2,
    direction: `row`,
    alignItems: `center`,
    justifyContent: `center`,
  } as any,
  contentImage: {
    resizeMode: `cover`,
    marginTop: 1,
    marginBottom: 1,
  } as any,
  contentText: {
    color: `gray.800`,
    fontSize: `md`,
    padding: 2,
  },
  contentTextDescription: {
    color: `gray.800`,
    fontSize: `xs`,
    isTruncated: true,
    noOfLines: 2,
    padding: 2,
  },
  infoRow: {
    direction: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
  } as any,
};
export { PreviewFeed };

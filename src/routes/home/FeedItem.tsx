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

import { Holiday } from "../../types";

interface FeedItemProps {
  item: Holiday;
  menu?: React.ReactNode;
  handlePreview: (item: Holiday | undefined) => void;
}

const FeedItem: React.FC<FeedItemProps> = ({ item, menu, handlePreview }) => {
  const [defaultImage] = useAssets(require("../../../assets/holiday.jpg"));

  return (
    <Box {...styles.container}>
      <Box {...styles.headerSession}>
        <Flex {...styles.headerRow}>
          <Text bold>{item.title}</Text>

          <Flex {...styles.headerActions}>
            <Badge {...styles.headerTag}>Feriado</Badge>
            {menu}
          </Flex>
        </Flex>
      </Box>

      <Box>
        <Badge {...styles.contentTag}>
          {dayjs(item.date).format("DD/MM/YYYY")}
        </Badge>
        {item.latitude && item.longitude && (
          <Badge {...styles.coordsTag}>
            <Text>{item.latitude}</Text>
            <Text>{item.longitude}</Text>
          </Badge>
        )}
        {defaultImage && (
          <Pressable
            onPressIn={() => handlePreview(item)}
            onPressOut={() => handlePreview(undefined)}
          >
            <AspectRatio ratio={1}>
              <Image
                {...styles.contentImage}
                source={{
                  uri: item.photo || defaultImage[0].uri,
                }}
                alt="Confraternização Universal"
              />
            </AspectRatio>
          </Pressable>
        )}
      </Box>
      <Divider backgroundColor="blue.100" />
      <Box>
        <Text {...styles.contentText}>{item.description}</Text>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    width: `full`,
    borderRadius: `md`,
    backgroundColor: `lightBlue.50`,
  },
  headerSession: {
    marginBottom: 1.5,
    padding: 2,
  },
  headerRow: {
    direction: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
  } as any,
  headerActions: {
    direction: `row`,
  } as any,
  headerTag: {
    colorScheme: `darkBlue`,
    marginRight: 3,
  },
  contentTag: {
    backgroundColor: `lightBlue.50`,
    borderBottomRightRadius: `xl`,
    width: 24,
    style: {
      position: `absolute`,
      top: 0,
      left: 0,
      zIndex: 10,
    },
  } as any,
  coordsTag: {
    backgroundColor: `lightBlue.50`,
    borderTopLeftRadius: `xl`,
    width: 24,
    style: {
      position: `absolute`,
      bottom: 0,
      right: 0,
      zIndex: 10,
    },
  } as any,
  contentImage: {
    resizeMode: `cover`,
    marginTop: 1,
    marginBottom: 1,
  } as any,
  contentText: {
    color: `gray.800`,
    fontSize: `xs`,
    isTruncated: true,
    noOfLines: 2,
    padding: 2,
  },
};

export { FeedItem };

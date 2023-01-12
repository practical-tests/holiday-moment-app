import { useAssets } from "expo-asset";
import { Badge, Box, Divider, Flex, Image, Pressable, Text } from "native-base";

import { Holiday } from "../../types";

interface FeedItemProps {
  item: Holiday;
  menu?: React.ReactNode;
}

const FeedItem: React.FC<FeedItemProps> = ({ item, menu }) => {
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
        <Badge {...styles.contentTag}>01/01/2023</Badge>
        {item.photo ||
          (defaultImage && (
            <Pressable
            // onLongPress={() => setShowFull(true)}
            // onPressOut={() => setShowFull(false)}
            >
              <Image
                {...styles.contentImage}
                source={{ uri: item.photo || defaultImage[0].uri }}
                alt="Confraternização Universal"
              />
            </Pressable>
          ))}
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
  contentImage: {
    resizeMode: `cover`,
    height: 48,
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

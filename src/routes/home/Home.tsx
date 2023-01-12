import { useAssets } from "expo-asset";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
  Text,
  Box,
  Badge,
  Flex,
  Divider,
  Image,
  Menu,
  Pressable,
} from "native-base";

const Home = () => {
  const [assets] = useAssets(require("../../../assets/holiday.jpg"));
  return (
    // <Center>
    <Box w={"full"}>
      <Box width={"full"} borderRadius="md" backgroundColor="lightBlue.50">
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
                w="190"
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
        {/* <Divider backgroundColor="blue.100" /> */}
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
            <Pressable onLongPress={() => console.log("long")}>
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
    </Box>
    // </Center>
  );
};

export { Home };

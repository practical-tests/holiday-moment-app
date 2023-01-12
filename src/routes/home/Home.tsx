import { useAssets } from "expo-asset";
import {
  View,
  Button,
  Text,
  Center,
  Container,
  Box,
  Badge,
  Flex,
  Divider,
  Image,
} from "native-base";

const Home = () => {
  const [assets] = useAssets(require("../../../assets/holiday.jpg"));
  return (
    <Center>
      <Container w={"full"} paddingTop="2.5">
        <Box
          width={"full"}
          borderColor="blue.100"
          borderWidth={"1"}
          borderRadius="md"
          padding={2}
          backgroundColor="lightBlue.50"
        >
          <Box marginBottom={"1.5"}>
            <Flex
              direction="row"
              alignItems={"center"}
              justifyContent="space-between"
            >
              <Text bold>Confraternização Universal</Text>
              <Badge colorScheme="success">Feriado</Badge>
            </Flex>
          </Box>
          <Divider backgroundColor="blue.100" />
          {assets && (
            <Image
              source={{ uri: assets[0].uri }}
              resizeMode="cover"
              height={"48"}
              marginTop={"1"}
              marginBottom="1"
              alt="Confraternização Universal"
            />
          )}
          <Divider backgroundColor="blue.100" />
          <Box>
            <Text color="gray.800" fontSize={"xs"} isTruncated noOfLines={2}>
              Início do ano civil, Dia Mundial da Paz, além de Dia da
              Fraternidade Universal, sendo assim, um feriado internacional,
              adotado por quase todas as nações do planeta.
            </Text>
          </Box>
        </Box>
      </Container>
    </Center>
  );
};

export { Home };

import { Box, Flex, HStack, Pressable, Text } from "native-base";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface AppHeaderProps {
  title: string;
  goBack: () => void;
  canGoBack: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, goBack, canGoBack }) => {
  return (
    <HStack
      bg="#117cfd"
      px="1"
      pb="2"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
    >
      <Box w="10">
        {canGoBack && (
          <Pressable
            w="full"
            alignItems="center"
            justifyContent="center"
            onPress={() => goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={20} color="white" />
          </Pressable>
        )}
      </Box>
      <Flex alignItems="center" justifyContent="center" flex="1">
        <Text color="white" fontSize="20" fontFamily="Poppins_700Bold">
          {title}
        </Text>
      </Flex>
      <Box w="10" />
    </HStack>
  );
};

export { AppHeader };

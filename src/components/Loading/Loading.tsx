import { Heading, HStack, Spinner } from "native-base";

const Loading: React.FC = () => {
  return (
    <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        Carregando
      </Heading>
    </HStack>
  );
};

export { Loading };

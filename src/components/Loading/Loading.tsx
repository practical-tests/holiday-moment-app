import { Heading, HStack, Spinner } from "native-base";

const Loading: React.FC = () => {
  return (
    <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading" size={60} color="#2161cb" />
    </HStack>
  );
};

export { Loading };

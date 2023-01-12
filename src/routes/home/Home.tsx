import { View, Button, Text } from "native-base";
import { env } from "../../utils";

const Home = () => {
  return (
    <View>
      <Button onPress={() => console.log("hello world")}>Click Me</Button>
      <Text>{env.BASE_URL_API}</Text>
    </View>
  );
};

export { Home };

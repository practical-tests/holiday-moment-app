import { Button, Text } from "native-base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface EditHolidayProps {
  navigation: NativeStackNavigationProp<any>;
}

const EditHoliday: React.FC<EditHolidayProps> = ({ navigation }) => {
  return (
    <>
      <Text>Edit</Text>
      <Button onPress={() => navigation.navigate("home")}>Home</Button>
    </>
  );
};

export { EditHoliday };

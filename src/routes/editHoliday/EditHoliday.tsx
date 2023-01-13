import { Text } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootRoutesType } from "../types";

interface EditHolidayProps
  extends NativeStackScreenProps<RootRoutesType, "EditHoliday"> {}

const EditHoliday: React.FC<EditHolidayProps> = (props) => {
  return (
    <>
      <Text>Edit</Text>
      {/* <Button onPress={() => navigation.navigate("home")}>Home</Button> */}
    </>
  );
};

export { EditHoliday };

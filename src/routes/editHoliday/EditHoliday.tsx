import { useContext, useState, useCallback, useEffect } from "react";
import { Text } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootRoutesType } from "../types";
import { AppContext } from "../../context";

interface EditHolidayProps
  extends NativeStackScreenProps<RootRoutesType, "EditHoliday"> {}

const EditHoliday: React.FC<EditHolidayProps> = ({ route }) => {
  const { holidayDb } = useContext(AppContext);
  const { params } = route;

  return (
    <>
      <Text>Edit</Text>
      {/* <Button onPress={() => navigation.navigate("home")}>Home</Button> */}
    </>
  );
};

export { EditHoliday };

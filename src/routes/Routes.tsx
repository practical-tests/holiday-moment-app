import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CameraPhoto } from "./cameraPhoto";
import { EditHoliday } from "./editHoliday";
import { Home } from "./home";
import { RootRoutesType } from "./types";

const Stack = createNativeStackNavigator<RootRoutesType>();

const Routes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="EditHoliday" component={EditHoliday} />
      <Stack.Screen name="CameraPhoto" component={CameraPhoto} />
    </Stack.Navigator>
  );
};

export { Routes };

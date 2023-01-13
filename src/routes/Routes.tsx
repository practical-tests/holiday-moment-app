import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EditHoliday } from "./editHoliday";
import { Home } from "./home";

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="editHoliday" component={EditHoliday} />
    </Stack.Navigator>
  );
};

export { Routes };

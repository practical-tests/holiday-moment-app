import "react-native-get-random-values";

import { NativeBaseProvider, StatusBar } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { Routes } from "./src/routes";
import { AppContextProvider } from "./src/context";

export default function App() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AppContextProvider>
          <Routes />
          <StatusBar backgroundColor="#117cfd" />
        </AppContextProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

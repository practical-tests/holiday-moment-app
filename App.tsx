import "react-native-get-random-values";

import { NativeBaseProvider, StatusBar } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

import { Routes } from "./src/routes";
import { AppContextProvider } from "./src/context";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AppContextProvider>
          <Routes />
          <StatusBar />
        </AppContextProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

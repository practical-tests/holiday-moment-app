import { NativeBaseProvider, StatusBar } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

import { Routes } from './src/routes';
import AppContextProvider from './src/context/AppContext';

export default function App() {
  // const {} = useSWR()
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


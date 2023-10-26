import { NativeBaseProvider } from "native-base";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import Root from "./src/navigations/Root";
import * as SplashScreen from "expo-splash-screen";
import store from "./src/store";
import { useEffect } from "react";
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import appTheme from "./src/theme";

SplashScreen.preventAutoHideAsync();
export default function App() {
  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NativeBaseProvider theme={appTheme}>
      <Provider store={store}>
        <Root />
      </Provider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({});

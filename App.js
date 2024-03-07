import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import OrderList from './src/screens/OrderList';
import Auth from './src/screens/Auth';
import Navigator from './src/Navigator';

import { useFonts, Lato_100Thin, Lato_400Regular, Lato_300Light } from "@expo-google-fonts/lato"
import { useState, useCallback, useEffect } from "react"
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Lato_100Thin,
          Lato_400Regular,
          Lato_300Light
        });
        await new Promise((resolve) => setTimeout(resolve, 0));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }


  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      {/* <OrderList/> */}
      {/*<Auth/>*/}
      <Navigator/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

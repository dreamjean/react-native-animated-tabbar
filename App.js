import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import React from "react";

import useLoadAssets from "./app/hooks/useLoadAssets";
import AppNavigator from "./app/navigation/AppNavigator";

const App = () => {
  const { assetsLoaded, setAssetsLoaded, loadAssetsAsync } = useLoadAssets();

  if (!assetsLoaded) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => setAssetsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;

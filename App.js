import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTabNavigator from "./components/MainTabNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
};

export default App;

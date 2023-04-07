import React from "react";
import { TouchableOpacity } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import EventScreen from "../screens/EventScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MessagesScreen from "../screens/MessagesScreen";
import LoginScreen from "../screens/LoginScreen";
<<<<<<< Updated upstream
import SignupScreen from "../screens/SignupScreen";
=======
>>>>>>> Stashed changes

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
<<<<<<< Updated upstream
    <Stack.Navigator>
=======
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#143D59",
        },
        headerTintColor: "#F4B41A",
      }}
    >
>>>>>>> Stashed changes
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Welcome" }}
      />
      <Stack.Screen
<<<<<<< Updated upstream
        name="Signup"
        component={SignupScreen}
        options={{ title: "Signup" }}
      />
      <Stack.Screen
=======
>>>>>>> Stashed changes
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="EventScreen"
        component={EventScreen}
        options={({ route }) => ({
          title: route.params.sport + " Events in " + route.params.location,
        })}
      />
    </Stack.Navigator>
  );
<<<<<<< Updated upstream
=======
};

const MessageStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#143D59",
        },
        headerTintColor: "#F4B41A",
      }}
    >
      <Stack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ title: "Messages" }}
      />
    </Stack.Navigator>
  );
>>>>>>> Stashed changes
};

const ProfileStack = () => {
  return (
<<<<<<< Updated upstream
    <Stack.Navigator>
=======
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#143D59",
        },
        headerTintColor: "#F4B41A",
      }}
    >
>>>>>>> Stashed changes
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "Profile",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => navigation.navigate("SettingsScreen")}
            >
<<<<<<< Updated upstream
              <MaterialIcons name="settings" size={24} color="black" />
=======
              <MaterialIcons name="settings" size={24} color="#F4B41A" />
>>>>>>> Stashed changes
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
<<<<<<< Updated upstream
        tabBarActiveTintColor: "#e91e63",
        inactiveTintColor: "gray",
=======
        tabBarStyle: { backgroundColor: "#143D59" },
        tabBarActiveTintColor: "#F4B41A",
        inactiveTintColor: "gray",
        tabStyle: { justifyContent: "center", alignItems: "center" },
>>>>>>> Stashed changes
      }}
    >
      <Tab.Screen
        name="Messages"
<<<<<<< Updated upstream
        component={MessagesScreen}
        options={{
=======
        component={MessageStack}
        options={{
          headerShown: false,
>>>>>>> Stashed changes
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="mail-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Hometab"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;

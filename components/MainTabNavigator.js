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
import SignupScreen from "../screens/SignupScreen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import EventDetailScreen from "../screens/EventDetailScreen";
import AccountSettingsScreen from "../screens/AccountSettingsScreen";
import CreateEventScreen from "../screens/CreateEventScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
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
        name="Home"
        component={HomeScreen}
        options={{ title: "Home", headerLeft: null, gestureEnabled: false }}
      />
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Welcome" }}
        />
        <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ title: "Signup" }}
        />
      <Stack.Screen
        name="EventScreen"
        component={EventScreen}
        options={({ route }) => ({
          title: route.params.sport + " Events in " + route.params.location,
        })}
      />
      <Stack.Screen
        name="Event Detail"
        component={EventDetailScreen}
        options={{ title: "Event Detail" }}
      />
        <Stack.Screen name={"CreateEventScreen"} component={CreateEventScreen} options={{title: "Create Event"}}/>
    </Stack.Navigator>
  );
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
};

const ProfileStack = () => {
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
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "Profile",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => navigation.navigate("SettingsScreen")}
            >
              <MaterialIcons name="settings" size={24} color="#F4B41A" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
<Stack.Screen
        name="AccountSettingsScreen"
        component={AccountSettingsScreen}
        options={{ title: "Account Settings" }}
        />
    </Stack.Navigator>

  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#143D59" },
        tabBarActiveTintColor: "#F4B41A",
        inactiveTintColor: "gray",
        tabStyle: { justifyContent: "center", alignItems: "center" },
      }}
    >
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

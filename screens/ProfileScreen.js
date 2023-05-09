import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.userInfo}>
          <Text style={styles.username}>John Doe</Text>
          <Text style={styles.location}>New York, NY</Text>
          <Text style={styles.sports}>Basketball, Tennis</Text>
        </View>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://ui-avatars.com/api/?background=0D8ABC&color=fff",
          }}
        />
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bioTitle}>Bio</Text>
        <Text style={styles.bioText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          aliquet, tortor sed accumsan bibendum, erat ligula aliquet ligula, sit
          amet pharetra nunc leo quis nunc.
        </Text>
      </View>
      <View style={styles.eventsContainer}>
        <Text style={styles.eventsTitle}>Events</Text>
        <View style={styles.events}>
          <View style={styles.event}>
            <Text style={styles.eventTitle}>Basketball</Text>
            <Text style={styles.eventLocation}>New York, NY</Text>
            <Text style={styles.eventDate}>March 28, 2023</Text>
          </View>
          <View style={styles.event}>
            <Text style={styles.eventTitle}>Tennis</Text>
            <Text style={styles.eventLocation}>London</Text>
            <Text style={styles.eventDate}>April 2, 2023</Text>
          </View>
          <View style={styles.event}>
            <Text style={styles.eventTitle}>Football</Text>
            <Text style={styles.eventLocation}>Paris</Text>
            <Text style={styles.eventDate}>April 8, 2023</Text>
          </View>
          <View style={styles.event}>
            <Text style={styles.eventTitle}>Basketball</Text>
            <Text style={styles.eventLocation}>Los Angeles</Text>
            <Text style={styles.eventDate}>April 15, 2023</Text>
          </View>
          <View style={styles.event}>
            <Text style={styles.eventTitle}>Tennis</Text>
            <Text style={styles.eventLocation}>Toronto</Text>
            <Text style={styles.eventDate}>April 23, 2023</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
ProfileScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Profile",
    headerRight: () => (
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => navigation.navigate("SettingsScreen")}
      >
        <MaterialIcons name="settings" size={24} color="black" />
      </TouchableOpacity>
    ),
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#143D59",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F4B41A",
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: "#F4B41A",
    marginBottom: 5,
  },
  sports: {
    fontSize: 16,
    color: "#F4B41A",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  bioContainer: {
    padding: 20,
  },
  bioTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F4B41A",
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    color: "#F4B41A",
  },
  eventsContainer: {
    padding: 20,
  },
  eventsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F4B41A",
    marginBottom: 10,
  },
  events: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  event: {
    width: "48%",
    backgroundColor: "#F4B41A",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#143D59",
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 16,
    color: "#143D59",
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 16,
    color: "#143D59",
  },
});

export default ProfileScreen;

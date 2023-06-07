import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_API } from "@env";

const EventDetailScreen = ({ route }) => {
  const { eventId, eventsData } = route.params;
  const [user, setUser] = useState({});
  const [currentUserId, setCurrentUserId] = useState("");
  const navigation = useNavigation();

  const event = eventsData.find((item) => item._id == eventId);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${USER_API}/api/auth/${event.createdBy}`
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCurrentUserId = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        const response = await axios.get(`${USER_API.trim()}:3000/api/auth/me`, {
          headers: { Authorization: token },
        });
        setCurrentUserId(response.data._id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrentUserId();
    fetchUserData();
  }, []);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found</Text>
      </View>
    );
  }

  const isCreator = currentUserId === event.createdBy;

  console.log(event);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.details}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.text}>{event.date.split("T")[0]}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.text}>
            {event.date.split("T")[1].split(":")[0] +
              ":" +
              event.date.split("T")[1].split(":")[1]}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.text}>{event.location}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.text}>{event.description}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Created by:</Text>
          <Avatar
            source={{
              uri: user.avatar
                ? user.avatar
                : "https://www.w3schools.com/howto/img_avatar.png",
            }}
            size="small"
            rounded
            containerStyle={styles.avatar}
          />
          <Text style={styles.text}>{user.name}</Text>
        </View>
        {isCreator ? (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 16,
                color: "#143D59",
                marginRight: 5,
                marginLeft: "auto",
              }}
              onPress={() =>
                navigation.navigate("EditEvent", {
                  eventId: event._id,
                  eventsData: eventsData,
                })
              }
            >
              Edit
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#143D59",
                marginLeft: 5,
              }}
              onPress={() =>
                navigation.navigate("DeleteEvent", {
                  eventId: event._id,
                  eventsData: eventsData,
                })
              }
            >
              Delete
            </Text>
          </View>
        ) : (
          <Text
            style={{
              fontSize: 16,
              color: "#143D59",
              marginLeft: "auto",
            }}
            onPress={() =>
              fetch(`${USER_API.trim()}/api/join`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  eventId: event._id,
                  userId: currentUserId,
                }),
              }).then((res) => {
                navigation.navigate("Home", {
                  screen: "Home",
                  params: {
                    screen: "Home",
                  },
                });
              })
            }
          >
            Request to join
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#143D59",
  },
  card: {
    backgroundColor: "#F4B41A",
    borderRadius: 8,
    padding: 20,
    width: "80%",
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#143D59",
    marginBottom: 10,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#143D59",
    marginRight: 5,
  },
  text: {
    fontSize: 16,
    color: "#143D59",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
});

export default EventDetailScreen;

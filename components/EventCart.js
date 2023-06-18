import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

const EventCart = ({ event }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.5:3000/api/auth/${event.createdBy}`
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.dateLocationContainer}>
        <Text style={styles.date}>{event.date.split("T")[0]}</Text>
        <Text style={styles.location}>{event.location}</Text>
      </View>
      <View style={styles.sportContainer}>
        <Text style={styles.sport}>{event.sport}</Text>
      </View>
      <View style={styles.userContainer}>
        <Text style={styles.userName}>{user.name}</Text>
        <Avatar
          rounded
          source={{
            uri: user.avatar
              ? user.avatar
              : "https://www.w3schools.com/howto/img_avatar.png",
          }}
          size="medium"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#143D59",
    width: 350,
    height: 150,
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateLocationContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  location: {
    color: "#fff",
    fontSize: 15,
  },
  sportContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",

    alignItems: "center",
  },
  sport: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  userContainer: {
    width: 100,

    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  userPoints: {
    color: "#fff",
    fontSize: 15,
  },
});

export default EventCart;

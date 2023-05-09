import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";

const EventCard = ({ date, location, sport, user }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dateLocationContainer}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
      <View style={styles.sportContainer}>
        <Text style={styles.sport}>{sport}</Text>
      </View>
      <View style={styles.userContainer}>
        <Avatar
          rounded
          source={{
            uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          }}
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userPoints}>{user.points} pts</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    padding: 10,
  },
  dateLocationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
  },
  location: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sportContainer: {
    marginVertical: 10,
  },
  sport: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  userPoints: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "gray",
  },
});

export default EventCard;

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
            uri: "https://ui-avatars.com/api/?background=0D8ABC&color=fff",
          }}
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userPoints}>{user.points} points</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4B41A",
    borderRadius: 8,
    padding: 20,
    elevation: 4,
    marginBottom: 20,
  },
  dateLocationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#143D59",
  },
  location: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#143D59",
  },
  sportContainer: {
    marginTop: 10,
  },
  sport: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#143D59",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#143D59",
    marginLeft: 10,
  },
  userPoints: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#143D59",
    marginLeft: 10,
  },
});

export default EventCard;

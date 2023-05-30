import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EventCart = ({ eventid, date, location, sport, user }) => {
  console.log(user); // Check the structure of the user object

  return (
      <View style={styles.container}>
        <Text style={styles.text}>{date}</Text>
        <Text style={styles.text}>{location}</Text>
        <Text style={styles.text}>{sport}</Text>
        {user && user.name && <Text style={styles.text}>{user.name}</Text>}
      </View>
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default EventCart;

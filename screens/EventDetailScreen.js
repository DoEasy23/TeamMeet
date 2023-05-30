import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

const EventDetailScreen = ({ route }) => {
  const { eventId, eventsData } = route.params;

  // Find the specific event using the eventId
  const event = eventsData.find((item) => item.id === eventId);

  // Check if event exists before accessing properties
  if (!event) {
    return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Event not found</Text>
        </View>
    );
  }

  // Check if event.user exists before accessing name property
  const userName = event.user?.name || "Unknown User";

  return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{event.sport}</Text>
          <View style={styles.details}>
            <Text style={styles.label}>User:</Text>
            <Text style={styles.text}>{userName}</Text>
            <Avatar
                style={styles.avatar}
                rounded
                source={{
                  uri: "https://ui-avatars.com/api/?background=0D8ABC&color=fff",
                }}
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.text}>{event.date}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.text}>{event.location}</Text>
          </View>
        </View>
      </View>
  );
};

// ...remaining styles and export statement

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
    marginLeft: "auto",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});

export default EventDetailScreen;

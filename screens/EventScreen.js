import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import EventCart from "../components/EventCart";
import { useNavigation } from "@react-navigation/native";

const eventsData = [
  {
    id: 1,
    date: "March 28, 2023",
    location: "New York",
    sport: "Basketball",
    user: { name: "John Doe", points: 25 },
  },
  {
    id: 2,
    date: "April 2, 2023",
    location: "London",
    sport: "Tennis",
    user: { name: "Jane Smith", points: 18 },
  },
  {
    id: 3,
    date: "April 8, 2023",
    location: "Paris",
    sport: "Football",
    user: { name: "Bob Johnson", points: 31 },
  },
  {
    id: 4,
    date: "April 15, 2023",
    location: "Los Angeles",
    sport: "Basketball",
    user: { name: "Alice Williams", points: 12 },
  },
  {
    id: 5,
    date: "April 23, 2023",
    location: "Toronto",
    sport: "Tennis",
    user: { name: "Tom Brown", points: 16 },
  },
];

const EventScreen = () => {
  const navigation = useNavigation();

  const handleEventPress = (eventId) => {
    navigation.navigate("Event Detail", { eventId: eventId, eventsData });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {eventsData.map((event) => (
        <TouchableOpacity
          key={event.id}
          onPress={() => handleEventPress(event.id)}
        >
          <EventCart
            date={event.date}
            location={event.location}
            sport={event.sport}
            user={event.user}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#143D59",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EventScreen;

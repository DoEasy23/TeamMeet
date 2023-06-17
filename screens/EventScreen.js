import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import EventCart from "../components/EventCart";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { USER_API } from "@env";

const EventScreen = ({ route }) => {
  const { sport, location } = route.params;
  console.log(sport, location);
  const navigation = useNavigation();
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`${USER_API}/api/events`);
        setEventsData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEventData();
  }, []);

  const handleEventPress = (eventId) => {
    navigation.navigate("Event Detail", { eventId: eventId, eventsData });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {eventsData.find(
        (event) =>
          event.sport === sport &&
          event.location.toUpperCase() === location.toUpperCase()
      ) ? (
        eventsData
          .filter(
            (event) =>
              event.sport === sport &&
              event.location.toUpperCase() === location.toUpperCase()
          )
          .map((event) => (
            <TouchableOpacity
              key={event._id}
              onPress={() => handleEventPress(event._id)}
            >
              <EventCart event={event} />
            </TouchableOpacity>
          ))
      ) : (
        <Text style={styles.errorText}>No event found</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#143D59",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default EventScreen;

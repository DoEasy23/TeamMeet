import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";
import EventCart from "../components/EventCart";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const EventScreen = () => {
  const navigation = useNavigation();
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get("http://192.168.1.200:3000/api/events");
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
        {eventsData.map((event, index) => {
          const createdByUser = event.createdBy && event.createdBy.user;
          const user = createdByUser ? { id: createdByUser.id, name: createdByUser.name } : null;

          return (
              <TouchableOpacity key={index} onPress={() => handleEventPress(event.id)}>
                <EventCart
                    eventid={event.id}
                    date={event.date}
                    location={event.location}
                    sport={event.sport}
                    user={user.name}
                />
              </TouchableOpacity>
          );
        })}
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
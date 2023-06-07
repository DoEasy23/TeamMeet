import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import { USER_API } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

const MyEventsScreen = () => {
  const [events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [requests, setRequests] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        console.log(token);
        const { id: userId } = decodedToken.user;

        console.log(decodedToken);
        setUserId(userId);
        console.log("User ID: ", userId);
      } catch (error) {
        console.log("Token çözümlenirken bir hata oluştu", error);
      }
    };
    fetchUserData();
    fetchEvents();
    fetchRequests();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${USER_API}/api/events`);
      setEvents(response.data);
      if (response.data) {
        const filteredEvents = response.data.filter(
          (event) => event.createdBy === userId
        );
        setUserEvents(filteredEvents);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${USER_API}/api/join`);
      if (response.data) {
        let filteredEvents = [];
        events.forEach((event) => {
          response.data.forEach((request) => {
            if (request.event === event._id) {
              filteredEvents.push(event);
            }
          });
        });
        console.log("Filtered Events: ", filteredEvents);
        console.log("User ID: ", userId);
        filteredEvents = filteredEvents.filter(
          (event) => event.createdBy === userId
        );
        setRequests(filteredEvents);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
      <Text style={styles.eventLocation}>{item.location}</Text>
      <Text style={styles.eventDate}>{item.date.split("T")[0]}</Text>
    </View>
  );

  const renderRequestItem = ({ item }) => (
    <View style={styles.requestItem}>
      <Text style={styles.requestUser}>{item.user.name}</Text>
      <Text style={styles.requestStatus}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Events</Text>
      <Text style={styles.subHeading}>Events:</Text>
      <FlatList
        data={userEvents}
        renderItem={renderEventItem}
        keyExtractor={(item) => item._id}
        style={styles.eventList}
      />
      <Text style={styles.subHeading}>Join Requests:</Text>
      <FlatList
        data={requests}
        renderItem={renderRequestItem}
        keyExtractor={(item) => item._id}
        style={styles.requestList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  eventList: {
    width: "100%",
    marginTop: 8,
  },
  eventItem: {
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: "#666",
  },
  eventDate: {
    fontSize: 14,
    color: "#666",
  },

  requestList: {
    width: "100%",
    marginTop: 8,
  },
  requestItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  requestUser: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  requestStatus: {
    fontSize: 14,
  },
});

export default MyEventsScreen;

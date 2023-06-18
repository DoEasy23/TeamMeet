import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { USER_API } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";

const MyEventsScreen = () => {
  const [events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [requests, setRequests] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwtDecode(token);

      const { id: userId } = decodedToken.user;

      setUserId(userId);
    } catch (error) {
      console.log("Token çözümlenirken bir hata oluştu", error);
    }
  };

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
        const filteredEvents = response.data.filter(
          (event) => event.eventOwner === userId
        );
        let AcceptedEvents = response.data.filter(
          (event) => event.status === "Accepted" && event.user === userId
        );

        AcceptedEvents = AcceptedEvents.map((event) => {
          const eventDetails = events.find(
            (eventDetail) => eventDetail._id === event.event
          );
          return eventDetails;
        });

        setUserEvents((prev) => [...prev, ...AcceptedEvents]);
        setRequests(filteredEvents);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDatas = async () => {
    await fetchUserData();
    await fetchEvents();
    await fetchRequests();
    setLoading(false);
  };

  useEffect(() => {
    fetchDatas();
  }, [loading]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Loading....</Text>
      </View>
    );
  }

  const handleAccept = async (id) => {
    try {
      const response = await axios.put(`${USER_API}/api/join/${id}`, {
        status: "Accepted",
      });
      if (response.data) {
        fetchRequests();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.put(`${USER_API}/api/join/${id}`, {
        status: "Rejected",
      });
      if (response.data) {
        fetchRequests();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEventPress = (eventId) => {
    navigation.navigate("Event Detail", {
      eventId: eventId,
      eventsData: events,
    });
  };

  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
      <TouchableOpacity
        onPress={() => {
          handleEventPress(item._id);
        }}
      >
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDescription}>{item.description}</Text>
        <Text style={styles.eventLocation}>{item.location}</Text>
        <Text style={styles.eventDate}>{item.date.split("T")[0]}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRequestItem = ({ item }) => {
    const event = events.find((event) => event._id === item.event);

    return (
      item.status === "Pending" && (
        <View style={styles.eventItem}>
          <Text style={styles.eventTitle}>
            Request Owner: {item.requestUserName}
          </Text>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDescription}>{event.description}</Text>
          <Text style={styles.eventLocation}>{event.location}</Text>
          <Text style={styles.eventDate}>{event.date.split("T")[0]}</Text>
          <Text style={styles.eventDate}>{item.status}</Text>
          <View style={styles.Buttons}>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => handleAccept(item._id)}
            >
              <Text style={styles.ButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() => handleReject(item._id)}
            >
              <Text style={styles.ButtonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    );
  };

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
  Buttons: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  acceptButton: {
    width: "50%",
    backgroundColor: "#1E90FF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  ButtonText: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  rejectButton: {
    width: "50%",
    backgroundColor: "#FF0000",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
});

export default MyEventsScreen;

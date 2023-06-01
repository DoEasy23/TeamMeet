import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import { USER_API } from "@env";
const MyEventsScreen = () => {
    const [events, setEvents] = useState([]);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchEvents();
        fetchRequests();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${USER_API}/api/events`);
            setEvents(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${USER_API}/api/join`);
            setRequests(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const renderEventItem = ({ item }) => (
        <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDescription}>{item.description}</Text>
            <Text style={styles.eventLocation}>{item.location}</Text>
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
                data={events}
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

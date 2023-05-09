import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const messages = [
  {
    id: 1,
    sender: "Alice",
    message: "Hello Bob, how are you?",
    time: "10:00 AM",
  },
  {
    id: 2,
    sender: "Bob",
    message: "Hi Alice, I am doing great. How about you?",
    time: "10:05 AM",
  },
  {
    id: 3,
    sender: "Alice",
    message: "I am good too, thanks for asking!",
    time: "10:10 AM",
  },
  {
    id: 4,
    sender: "Alice",
    message: "I am good too, thanks for asking!",
    time: "10:10 AM",
  },
];

const MessagesScreen = () => {
  const [data, setData] = useState(messages);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.sender}>{item.sender}</Text>
            <View style={styles.messageContent}>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#143D59",
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    marginBottom: 20,
  },
  sender: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  messageContent: {
    backgroundColor: "#F4B41A",
    borderRadius: 8,
    padding: 10,
  },
  message: {
    color: "#143D59",
    fontSize: 16,
  },
  time: {
    color: "#143D59",
    fontSize: 12,
    textAlign: "right",
    marginTop: 5,
  },
});

export default MessagesScreen;

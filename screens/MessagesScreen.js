import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const messages = [
    {
        id: 1,
        sender: 'Alice',
        message: 'Hello Bob, how are you?',
        time: '10:00 AM',
    },
    {
        id: 2,
        sender: 'Bob',
        message: 'Hi Alice, I am doing great. How about you?',
        time: '10:05 AM',
    },
    {
        id: 3,
        sender: 'Alice',
        message: 'I am good too, thanks for asking!',
        time: '10:10 AM',
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
                    <View style={styles.message}>
                        <Text style={styles.sender}>{item.sender}</Text>
                        <Text style={styles.messageText}>{item.message}</Text>
                        <Text style={styles.time}>{item.time}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    message: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
    },
    sender: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    messageText: {
        marginBottom: 5,
    },
    time: {
        color: '#888',
    },
});

export default MessagesScreen;

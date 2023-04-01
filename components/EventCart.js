import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';

const EventCard = ({ date, location, sport, user, points }) => {
    return (
        <View style={styles.container}>
            <View style={styles.dateLocationContainer}>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.location}>{location}</Text>
            </View>
            <View style={styles.sportContainer}>
                <Text style={styles.sport}>{sport}</Text>
            </View>
            <View style={styles.userContainer}>
                <Avatar
                    rounded
                    size="small"
                    source={{ uri: user.avatar }}
                />
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userPoints}>{points} points</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    dateLocationContainer: {
        flex: 2,
        alignItems: 'flex-start',
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    location: {
        fontSize: 14,
    },
    sportContainer: {
        flex: 1,
        alignItems: 'center',
    },
    sport: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userContainer: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    userName: {
        marginLeft: 5,
        fontSize: 14,
    },
    userPoints: {
        marginLeft: 5,
        fontSize: 12,
        color: '#999',
    },
});

export default EventCard;
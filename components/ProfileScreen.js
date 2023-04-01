import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
const ProfileScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.userInfo}>
                    <Text style={styles.username}>John Doe</Text>
                    <Text style={styles.location}>New York, USA</Text>
                    <Text style={styles.sports}>Football, Basketball, Tennis</Text>
                </View>
                <Image
                    style={styles.avatar}
                    source={{ uri: 'https://via.placeholder.com/150' }}
                />
            </View>
            <View style={styles.bioContainer}>
                <Text style={styles.bioTitle}>About me</Text>
                <Text style={styles.bioText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                    aliquet, enim ut maximus semper, nulla lacus facilisis nisi, ac
                    pellentesque tortor justo at elit. Proin bibendum elit vel quam
                    suscipit, nec faucibus nunc lacinia. Integer ultricies ipsum ut
                    orci egestas fermentum.
                </Text>
            </View>
            <View style={styles.eventsContainer}>
                <Text style={styles.eventsTitle}>Joined events</Text>
                {/* Render the list of joined events */}
            </View>
        </View>
    );



};
ProfileScreen.navigationOptions = ({ navigation }) => {
    return {
        title: 'Profile',
        headerRight: () => (
            <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => navigation.navigate('SettingsScreen')}
            >
                <MaterialIcons name="settings" size={24} color="black" />
            </TouchableOpacity>
        ),
    };
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    },
    userInfo: {
        marginRight: 20,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    location: {
        fontSize: 16,
        marginBottom: 5,
    },
    sports: {
        fontSize: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    bioContainer: {
        padding: 20,
    },
    bioTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bioText: {
        fontSize: 16,
    },
    eventsContainer: {
        flex: 1,
        padding: 20,
    },
    eventsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default ProfileScreen;

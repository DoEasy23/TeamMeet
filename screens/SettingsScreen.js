import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [sports, setSports] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const token = AsyncStorage.getItem("token");

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.put(
                "http://192.168.1.200:3000/api/auth/updateProfile",
                {
                    name,
                    location,
                    bio,
                    sports,
                },
                {
                    headers: { Authorization: token },
                }
            );
            setSuccess(response.data.message);
        } catch (error) {
            setError(error.response.data.error);
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem("token");
        navigation.navigate("Login");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.formContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Text style={styles.label}>Location</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your location"
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                />
                <Text style={styles.label}>Bio</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your bio"
                    value={bio}
                    onChangeText={(text) => setBio(text)}
                />
                <Text style={styles.label}>Sports</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your sports"
                    value={sports}
                    onChangeText={(text) => setSports(text)}
                />
                {error && <Text style={styles.error}>{error}</Text>}
                {success && <Text style={styles.success}>{success}</Text>}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? "Loading..." : "Update Profile"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.accountButton}
                    onPress={() => navigation.navigate("AccountSettingsScreen")}
                >
                    <Text style={styles.accountButtonText}>Account Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
    },
    heading: {
        fontSize: 30,
        color: "#143D59",
        fontWeight: "bold",
        marginBottom: 20,
    },
    form: {
        width: "100%",
    },
    input: {
        backgroundColor: "#F2F2F2",
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: "#143D59",
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        textAlign: "center",
    },
    accountButton: {
        marginTop: 10,
    },
    accountButtonText: {
        color: "#143D59",
        fontSize: 16,
        textAlign: "center",
    },
    logoutButton: {
        marginTop: 20,
    },
    logoutButtonText: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
    },
});

export default SettingsScreen;

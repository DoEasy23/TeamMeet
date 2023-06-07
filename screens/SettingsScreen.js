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
import { USER_API } from "@env";
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
        `${USER_API}/api/auth/updateProfile`,
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
        <View style={styles.buttons}>
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
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#143D59",
    justifyContent: "center",
  },
  formContainer: {
    marginHorizontal: 30,
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#F4B41A",
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  accountButton: {
    flex: 1,
    backgroundColor: "green",
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 6,
  },
  accountButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  logoutButton: {
    flex: 1,
    backgroundColor: "red",
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    marginTop: 40,
  },
});

export default SettingsScreen;

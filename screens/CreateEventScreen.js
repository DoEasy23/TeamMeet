import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateEventScreen = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [sport, setSport] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
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
  }, []);
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleCreateEvent = async () => {
    if (!userId) {
      console.log("User ID is not available");
      return;
    }
    const currentDate = new Date();
    if (date < currentDate) {
      Alert.alert(
        "Invalid Date",
        "Please select a date today or in the future."
      );
    } else {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.post(
          "http://192.168.1.5:3000/api/events",
          {
            title,
            location,
            date,
            description,
            sport,
            createdBy: userId,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setSuccess(response.data.message);
        setTitle("");
        setLocation("");
        setDate("");
        setDescription("");
      } catch (error) {
        setError(error.response.data.error);
      }

      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter event title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter event location"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter event description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Text style={styles.label}>Sport</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter event sport"
          value={sport}
          onChangeText={(text) => setSport(text)}
        />

        <TouchableOpacity style={styles.button} onPress={showDatepicker}>
          <Text style={styles.buttonText}>Select Date</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleCreateEvent}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Creating Event..." : "Create Event"}
          </Text>
        </TouchableOpacity>

        {error && <Text style={styles.error}>{error}</Text>}
        {success && <Text style={styles.success}>{success}</Text>}
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
  formContainer: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
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
  error: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
  success: {
    color: "green",
    fontSize: 16,
    marginBottom: 10,
  },
});

export default CreateEventScreen;

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const sports = [
  { label: "Football", value: "football" },
  { label: "Basketball", value: "basketball" },
  { label: "Tennis", value: "tennis" },
];

const HomeScreen = () => {
  const [open, setOpen] = useState(false);
  const [sport, setSport] = useState("");
  const [location, setLocation] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    //check if user is logged in
    const checkLoggedIn = async () => {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            navigation.navigate("Login");
        }
    };
    checkLoggedIn();


    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );
    return () => backHandler.remove();
  }, []);

  const handleSearch = () => {
    if (sport && location) {
      navigation.navigate("EventScreen", { sport, location });
    } else {
      alert("Please select a sport and enter a location");
    }
  };

  const handleCreateEvent = () => {
    navigation.navigate("CreateEventScreen");
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Find Events</Text>
        <View style={styles.dropdownContainer}>
          <DropDownPicker
              open={open}
              value={sport}
              items={sports}
              setOpen={setOpen}
              setValue={setSport}
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              arrowColor="#143D59"
              containerStyle={styles.dropdownContainer}
              dropDownContainerStyle={styles.dropdownDropContainer}
          />
        </View>
        <TextInput
            style={styles.input}
            placeholder="Enter a location"
            placeholderTextColor="#143D59"
            onChangeText={(text) => setLocation(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonTitle}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createEventButton} onPress={handleCreateEvent}>
          <Text style={styles.createEventButtonText}>Create Event</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#143D59",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F4B41A",
    marginBottom: 20,
  },
  dropdownContainer: {
    marginBottom: 20,
    zIndex: 1,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  dropdownText: {
    color: "#143D59",
  },
  dropdownDropContainer: {
    borderWidth: 0,
    marginTop: -8,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
    color: "#143D59",
  },
  button: {
    backgroundColor: "#F4B41A",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#143D59",
    textAlign: "center",
  },
  createEventButton: {
    marginTop: 10,
    backgroundColor: "#143D59",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 8,
  },
  createEventButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F4B41A",
    textAlign: "center",
  },
});

export default HomeScreen;

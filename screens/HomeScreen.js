import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";

import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";

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

  const handleSearch = () => {
    if (sport && location) {
      // Navigate to EventScreen with sport and location params
      navigation.navigate("EventScreen", { sport, location });
    } else {
      alert("Please select a sport and enter a location");
    }
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
});

export default HomeScreen;

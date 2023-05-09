import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";

const SettingsScreen = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  const handleSave = () => {
    // Burada save işlemini yapabilirsiniz, örneğin backend'e post request atabilirsiniz
    console.log(`name: ${name}, age: ${age}, location: ${location}`);
    Keyboard.dismiss();
  };

  const handleAgeChange = (text) => {
    // Sadece sayısal değerleri kabul etmek için regex kullanarak kontrol yapılıyor
    if (/^\d*$/.test(text)) {
      setAge(text);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#143D59"
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        placeholderTextColor="#143D59"
        onChangeText={handleAgeChange}
        keyboardType="numeric"
        value={age}
      />
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your location"
        placeholderTextColor="#143D59"
        onChangeText={(text) => setLocation(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#143D59",
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#F4B41A",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F4B41A",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#F4B41A",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    color: "#143D59",
  },
  button: {
    backgroundColor: "#F4B41A",
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#143D59",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SettingsScreen;

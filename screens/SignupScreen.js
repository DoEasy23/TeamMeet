import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://192.168.1.185:3000/api/auth/signup', {
        name,
        email,
        password,
        phone,
        location,
        birthday,
      });
      console.log(response.data);
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthday(currentDate);
  };

  const showMode = () => {
    setShowDatePicker(true);
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#143D59"
            onChangeText={(text) => setName(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#143D59"
            onChangeText={(text) => setEmail(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#143D59"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="#143D59"
            onChangeText={(text) => setPhone(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Location"
            placeholderTextColor="#143D59"
            onChangeText={(text) => setLocation(text)}
        />
        <TouchableOpacity style={styles.dateButton} onPress
            ={showMode}>
            <Text style={styles.buttonText}>Select Birthday</Text>
        </TouchableOpacity>
        {showDatePicker && (
            <DateTimePicker
                testID="dateTimePicker"
                value={birthday}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
            />
        )}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
        >
            <Text style={styles.signUpText}>Already have an account? Login</Text>
        </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#143D59",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: "#143D59",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#143D59",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    marginTop: 20,
  },
  signUpText: {
    color: "#143D59",
  },
});
export default SignupScreen;
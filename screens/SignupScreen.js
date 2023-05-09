import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // burada signup işlemini yapabilirsiniz, örneğin backend'e post request atabilirsiniz
    console.log(`email: ${email}, password: ${password}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#143D59",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#F4B41A",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    width: "80%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
    color: "#143D59",
  },
  button: {
    backgroundColor: "#F4B41A",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#143D59",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SignupScreen;

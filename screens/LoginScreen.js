import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // burada login işlemini yapabilirsiniz, örneğin backend'e post request atabilirsiniz
    console.log(`email: ${email}, password: ${password}`);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
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
    width: "80%",
    backgroundColor: "#F4B41A",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#143D59",
  },
  button: {
    width: "80%",
    backgroundColor: "#F4B41A",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#143D59",
  },
  link: {
    marginTop: 10,
  },
  signUpText: {
    color: "#fff",
  },
});

export default LoginScreen;

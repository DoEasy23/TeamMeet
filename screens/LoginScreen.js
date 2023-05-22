import React, {useEffect, useState} from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Add a request interceptor to send the token with each request
    const requestInterceptor = axios.interceptors.request.use(
        async (config) => {
          const token = await AsyncStorage.getItem("token");
          if (token) {
            config.headers.Authorization = `${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
    );

    // Add a response interceptor to update the token if it's returned in the response
    const responseInterceptor = axios.interceptors.response.use(
        async (response) => {
          const newToken = response.headers.authorization;
          if (newToken) {
            await AsyncStorage.setItem("token", newToken.replace("", ""));
          }
          return response;
        },
        (error) => {
          return Promise.reject(error);
        }
    );

    // Remove the interceptors when the component unmounts
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.1.185:3000/api/auth/login", {
        email,
        password,
      });
      const token = response.data.token;
      await AsyncStorage.setItem("token", token); // save token to local storage
      console.log(response.data); // print response data from your backend
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
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

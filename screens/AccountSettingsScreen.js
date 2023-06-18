import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { USER_API } from "@env";

const AccountSettingsScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updateAccount = async () => {
    const token = await AsyncStorage.getItem("token");
    const data = {};
    if (email) {
      data.email = email;
    }
    if (phone) {
      data.phone = phone;
    }
    if (password && newPassword) {
      data.password = password;
      data.newPassword = newPassword;
    }
    try {
      await axios.put(`${USER_API}/api/auth/update`, data, {
        headers: { Authorization: token },
      });
      alert("Account updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={24} color="#4a4a4a" />
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialIcons name="phone" size={24} color="#4a4a4a" />
            <TextInput
              placeholder="Phone Number"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="phone-pad"
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={24} color="#4a4a4a" />
            <TextInput
              placeholder="Current Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={24} color="#4a4a4a" />
            <TextInput
              placeholder="New Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={updateAccount}>
            <Text style={styles.buttonText}>Update Account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#143D59",
  },
  form: {
    marginTop: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#F4B41A",
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 6,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AccountSettingsScreen;

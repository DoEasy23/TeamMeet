import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import EventCart from "../components/EventCart";
import { USER_API } from "@env";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`${USER_API.trim()}/api/auth/me`, {
            headers: { Authorization: token },
          });
          setUser(response.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        navigation.navigate("Login");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchUser();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchUser = async () => {
    const token = await AsyncStorage.getItem("token"); // retrieve token from local storage
    console.log(token);
    try {
      const response = await axios.get(`${USER_API}/api/auth/me`, {
        headers: { Authorization: token }, // pass token in headers
      });
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return null; // Eğer kullanıcı verisi henüz yüklenmediyse null döndürerek yüklenmesini bekleyebiliriz.
  }
  const changeAvatar = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        console.log("Permission to access camera roll denied");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (pickerResult.canceled) {
        console.log("User cancelled image selection");
        return;
      }

      const { uri } = pickerResult.assets[0];
      const newPath = `${FileSystem.documentDirectory}profile.jpg`;
      await FileSystem.copyAsync({ from: uri, to: newPath });
      setAvatar(newPath);
      console.log(newPath)
      console.log(pickerResult.assets[0])
      const formData = new FormData();
      formData.append("avatar", {
        uri: newPath,
        name: `${user.email}.jpg`,
        type: "image/jpeg",
      });

      const token = await AsyncStorage.getItem("token");
      try {
        const response = await axios.put(
            `${USER_API}/api/auth/updateAvatar`,
            formData,
            {
              headers: {
                Authorization: token,
                "Content-Type": "multipart/form-data",
              },
            }
        );
        console.log(formData)
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log("Error selecting profile image:", error);
    }
  };


  console.log(`${USER_API.trim()}/${user.avatarUrl}`);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.location}>{user.location}</Text>
          <Text style={styles.sports}>{user.preferredSports}</Text>
        </View>
        <TouchableOpacity onPress={changeAvatar}>
        <Image
          style={styles.avatar}
          source={{
            uri: user.avatarUrl
              ? `${USER_API.trim()}/${user.avatarUrl.replace("\\", "/")}`
              : "https://www.w3schools.com/howto/img_avatar.png",
          }}
        />
        </TouchableOpacity>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bioTitle}>Bio</Text>
        <Text style={styles.bioText}>{user.bio}</Text>
      </View>
      <View style={styles.eventsContainer}>
        <Text style={styles.eventsTitle}>Events</Text>
        {user.joinedEvents.map((event) => (
          <EventCart key={event._id} event={event} />
        ))}
      </View>
    </View>
  );
};

ProfileScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Profile",
    headerRight: () => (
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => navigation.navigate("SettingsScreen")}
      >
        <MaterialIcons name="settings" size={24} color="black" />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#143D59",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F4B41A",
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: "#F4B41A",
    marginBottom: 5,
  },
  sports: {
    fontSize: 16,
    color: "#F4B41A",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  bioContainer: {
    padding: 20,
  },
  bioTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F4B41A",
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    color: "#F4B41A",
  },
  eventsContainer: {
    padding: 20,
  },
  eventsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F4B41A",
    marginBottom: 10,
  },
  events: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  event: {
    width: "50%",
    padding: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F4B41A",
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 16,
    color: "#F4B41A",
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 16,

    color: "#F4B41A",
  },
});
export default ProfileScreen;

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AccountSettingsScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const updateAccount = async () => {
        const token = await AsyncStorage.getItem('token');
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
            await axios.put('http://192.168.1.185:3000/api/auth/update', data, {
                headers: { Authorization: token }
            });
            alert('Account updated successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name='email' size={24} color='#4a4a4a' />
                        <TextInput
                            placeholder='Email'
                            autoCapitalize='none'
                            autoCorrect={false}
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name='phone' size={24} color='#4a4a4a' />
                        <TextInput
                            placeholder='Phone Number'
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='phone-pad'
                            style={styles.input}
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name='lock' size={24} color='#4a4a4a' />
                        <TextInput
                            placeholder='Current Password'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name='lock' size={24} color='#4a4a4a' />
                        <TextInput
                            placeholder='New Password'
                            autoCapitalize='none'
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
        backgroundColor: '#fff'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 50
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderColor: '#4a4a4a',
        borderBottomWidth: 1,
        width: '100%'
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    button: {
        backgroundColor: '#4a4a4a',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
        width: '100%'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    }
});

export default AccountSettingsScreen;

import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import EventScreen from './EventScreen';


const sports = [
    { label: 'Football', value: 'football' },
    { label: 'Basketball', value: 'basketball' },
    { label: 'Tennis', value: 'tennis' },
];


const HomeScreen = () => {
    const [open, setOpen] = useState(false);
    const [sport, setSport] = useState('');
    const [location, setLocation] = useState('');
    const navigation = useNavigation();

    const handleSearch = () => {
        // Your search logic goes here
        console.log(`Searching for ${sport} in ${location}`);

        // Navigate to EventsScreen with sport and location params
        navigation.navigate('EventScreen', { sport, location });
    };

    return (
        <View style={styles.container}>
            <DropDownPicker
                items={sports}
                setOpen={setOpen}
                open={open}
                defaultValue={sport}
                value={sport}
                setValue={setSport}
                placeholder="Select a sport"
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                    justifyContent: 'flex-start',

                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={(item) => setSport(item.value)}
            />
            <TextInput
                placeholder="Enter a location"
                value={location}
                onChangeText={(text) => setLocation(text)}
                style={styles.input}
            />
            <Button title="Search" onPress={handleSearch} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
    },

});

export default HomeScreen;

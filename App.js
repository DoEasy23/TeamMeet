import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './components/MainStackNavigator';

const App = () => {
    return (
        <NavigationContainer>
            <MainStackNavigator />
        </NavigationContainer>
    );
};

export default App;

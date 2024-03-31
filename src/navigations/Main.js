import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from '../screens';

const Stack = createStackNavigator();

const Main = () => {
    const theme = useContext(ThemeContext);
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTintColor: theme.text2,
                headerBackTitleVisible: false,
                cardStyle: { backgroundColor: theme.background },
            }}
        >
            <Stack.Screen name='Profile' component={Profile} />
        </Stack.Navigator>
    );
};

export default Main;

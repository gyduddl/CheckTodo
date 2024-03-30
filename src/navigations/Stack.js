import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, List, Chat } from '../screens';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// createStackNavigator을 이용해 stack navigation을 생성
const Stack = createStackNavigator();

const StackNav = () => {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                cardStyle: { backgroundColor: '#ffffff' },
                headerStyle: {
                    height: 120,
                    backgroundColor: 'skyblue',
                    borderBottomWidth: 5,
                    borderBottomColor: '#111111',
                },
                headerTitleStyle: {
                    fontSize: 24,
                    // color: '#ffffff',
                },
                headerTitleAlign: 'center',
                headerTitle: ({ style, tintColor }) => {
                    return <FontAwesome5 name='react' style={style} color={tintColor} />;
                },
                headerBackTitle: 'Prev',
                headerBackTitleVisible: true,
                headerBackTitleStyle: { fontSize: 26 },
                headerTintColor: '#ff6600',
            }}
        >
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Stack.Screen
                name='Chat'
                component={Chat}
                options={{
                    headerTitle: 'Chat Screen',
                    headerBackImage: ({ tintColor }) => {
                        return (
                            <MaterialCommunityIcons
                                name='keyboard-backspace'
                                size={26}
                                color={tintColor}
                                style={{ marginRight: 5, marginLeft: 5 }}
                            />
                        );
                    },
                }}
            />
            <Stack.Screen name='List' component={List} />
        </Stack.Navigator>
    );
};

export default StackNav;

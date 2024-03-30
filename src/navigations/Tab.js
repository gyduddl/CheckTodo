import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Mail, Profile, Settings } from '../screens';
import { MaterialIcons } from '@expo/vector-icons';

const TabIcon = ({ name, size, color }) => {
    return <MaterialIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const TabNav = () => {
    return (
        <Tab.Navigator
            initialRouteName='Mail'
            screenOptions={{
                tabBarShowLabel: true,
                tabBarLabelPosition: 'below-icon',
                tabBarStyle: {
                    backgroundColor: 'gray',
                    borderTopColor: 'red',
                    borderTopWidth: 3,
                },
                tabBarActiveTintColor: '#ffffff',
                tabBarInactiveTintColor: '#333333',
            }}
        >
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: (props) => {
                        return TabIcon({ ...props, name: props.focused ? 'person' : 'person-outline' });
                    },
                }}
            />
            <Tab.Screen
                name='Settings'
                component={Settings}
                options={{
                    tabBarIcon: (props) => {
                        return TabIcon({ ...props, name: 'settings' });
                    },
                }}
            />
            <Tab.Screen
                name='Mail'
                component={Mail}
                options={{
                    tabBarIcon: (props) => {
                        return TabIcon({ ...props, name: 'mail' });
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNav;

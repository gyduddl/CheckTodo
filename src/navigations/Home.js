import React, { useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChannelList, Profile, TodoApp } from '../screens';
import { MaterialIcons } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'; //**현재 선택된 화면의 이름을 알수 있는 함수 */

const TabIcon = ({ name, focused, theme }) => {
    return <MaterialIcons name={name} size={26} color={focused ? theme.tabBtnActive : theme.tabBtnInactive} />;
};

const Tab = createBottomTabNavigator();

const Home = ({ navigation, route }) => {
    const theme = useContext(ThemeContext);

    //화면이 바뀔때마다 헤더 이름 해당 화면으로 바뀌도록 설정
    useEffect(() => {
        const screenName = getFocusedRouteNameFromRoute(route) || 'List';
        navigation.setOptions({
            headerTitle: screenName,
            headerRight: () =>
                screenName === 'List' && (
                    <MaterialIcons
                        name='add'
                        size={26}
                        style={{ margin: 10 }}
                        onPress={() => navigation.navigate('ChannelCreation')}
                    />
                ),
        });
    });

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.tabBtnActive,
                tabBarInactiveTintColor: theme.tabBtnInactive,
            }}
        >
            <Tab.Screen
                name='List'
                component={ChannelList}
                options={{
                    tabBarIcon: ({ focused }) =>
                        TabIcon({
                            name: focused ? 'chat-bubble' : 'chat-bubble-outline',
                            focused,
                            theme,
                        }),
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) =>
                        TabIcon({
                            name: focused ? 'person' : 'person-outline',
                            focused,
                            theme,
                        }),
                }}
            />
            <Tab.Screen
                name='TodoApp'
                component={TodoApp}
                options={{
                    tabBarIcon: ({ focused }) =>
                        TabIcon({
                            name: 'checklist',
                            focused,
                            theme,
                        }),
                }}
            />
        </Tab.Navigator>
    );
};

export default Home;

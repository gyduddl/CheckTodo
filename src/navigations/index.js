import { NavigationContainer } from '@react-navigation/native';
// import StackNav from './Stack';
import React from 'react';
// import TabNav from './Tab';
// import TodoApp from '../screens/TodoApp';
import Auth from './Auth';

const Navigation = () => {
    return (
        <NavigationContainer>
            {/* <StackNav /> */}
            {/* <TabNav /> */}
            <Auth />
            {/* <TodoApp /> */}
        </NavigationContainer>
    );
};

export default Navigation;

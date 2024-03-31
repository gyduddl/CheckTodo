import React from 'react';
import styled from 'styled-components/native';
import { Button } from '../components';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

const Profile = ({ navigation, route }) => {
    console.log(route.params);
    return (
        <Container>
            <Button title='signout' onPress={() => navigation.navigate('Signin')} />
        </Container>
    );
};

export default Profile;

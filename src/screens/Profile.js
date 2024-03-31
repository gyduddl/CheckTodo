import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts';
import styled from 'styled-components/native';
import { Button, Image, CheckInput } from '../components';
import { getCurrentUser, updateUserInfo, signout } from '../firebase';
import { Alert } from 'react-native';
import { ProgressContext } from '../contexts';
import { ThemeContext } from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

const Profile = ({ navigation, route }) => {
    const { spinner } = useContext(ProgressContext);
    const { setUser } = useContext(UserContext);
    const theme = useContext(ThemeContext);
    const user = getCurrentUser();

    const [photo, setPhoto] = useState(user.photo);

    const _handlePhotoChange = async (url) => {
        try {
            spinner.start();
            const photoURL = await updateUserInfo(url);
            setPhoto(photoURL);
        } catch (e) {
            Alert.alert('Photo Error', e.message);
        } finally {
            spinner.stop();
        }
    };

    return (
        <Container>
            <Image showButton url={photo} onChangePhoto={_handlePhotoChange} />
            <CheckInput label='Name' value={user.name} disabled />
            <CheckInput label='Email' value={user.email} disabled />
            <Button
                title='Sign out'
                onPress={async () => {
                    try {
                        await signout();
                    } catch (e) {
                    } finally {
                        setUser({});
                    }
                }}
                containerStyle={{
                    backgroundColor: theme.btnSignout,
                }}
            />
        </Container>
    );
};

export default Profile;

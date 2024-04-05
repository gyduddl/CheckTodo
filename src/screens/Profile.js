import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import { Button, Image, CheckInput } from '../components';
import { getCurrentUser, updateUserInfo, signout } from '../firebase';
import { Alert } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { useRecoilState } from 'recoil';
import { spinnerAtom } from '../contexts/Progress';
import { userAtom } from '../contexts/User';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

const Profile = ({ navigation, route }) => {
    const [inProgress, setInProgress] = useRecoilState(spinnerAtom);
    const [userState, setUserState] = useRecoilState(userAtom);

    const theme = useContext(ThemeContext);
    const user = getCurrentUser();

    const [photo, setPhoto] = useState(user.photo);

    const _handlePhotoChange = async (url) => {
        try {
            setInProgress(true);
            const photoURL = await updateUserInfo(url);
            setPhoto(photoURL);
        } catch (e) {
            Alert.alert('Photo Error', e.message);
        } finally {
            setInProgress(false);
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
                        setUserState({});
                        // setUser({});
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

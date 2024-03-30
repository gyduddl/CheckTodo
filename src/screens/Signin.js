import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components/native';
import { Button, Image, CheckInput } from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 0 20px;
    padding-top: ${({ insets: { top } }) => top}px;
    padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

const LOGO = `https://firebasestorage.googleapis.com/v0/b/checktodo-68e26.appspot.com/o/icon.png?alt=media`;

const Signin = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const theme = useContext(ThemeContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const refPassword = useRef(null);

    //비밀번호를 입력하는 input 컴포넌트의 onSubmitEditing과 signin버튼에서 호출되는 onPress가 같은 함수를 바라보도록 하는 함수
    const _handleSigninBtnPress = () => {
        console.log('signin');
    };
    return (
        <Container insets={insets}>
            <Image url={LOGO} />
            <CheckInput
                label='Email'
                placeholder='Email'
                returnKeyType='next'
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={() => refPassword.current.focus()}
            />
            <CheckInput
                ref={refPassword}
                label='Password'
                placeholder='Password'
                returnKeyType='done'
                value={password}
                onChangeText={setPassword}
                isPassword={true}
                onSubmitEditing={_handleSigninBtnPress}
            />
            <Button title='sign up' onPress={_handleSigninBtnPress} />
            <Button
                title='or sign up'
                onPress={() => navigation.navigate('Signup')}
                containerStyle={{ marginTop: 0, backgroundColor: 'transparent' }}
                textStyle={{ color: theme.btnTextLink, fontSize: 18 }}
            />
        </Container>
    );
};

export default Signin;

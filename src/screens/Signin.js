import React, { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { Button, Image, CheckInput, ErrorMessage } from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signin } from '../firebase';
import { Alert } from 'react-native';
import { validateEmail, removeWhitespace } from '../utils';

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
    const [errorMessage, setErrorMessage] = useState('');
    //이메일과 비밀번호 disabled 설정
    const [disabled, setDisabled] = useState(true);
    const refPassword = useRef(null);

    // disabled 설정함수
    // + 이메일이 입력되어 있고, 비밀번호가 입력되어 있고, 에러메시지가 없을때
    // + disabled가 false가 된다.
    useEffect(() => {
        setDisabled(!(email && password && !errorMessage));
    }, [email, password, errorMessage]);

    //유효성 검사
    const _handleEmailChange = (email) => {
        const changedEmail = removeWhitespace(email);
        setEmail(changedEmail);
        setErrorMessage(validateEmail(changedEmail) ? '' : 'Please verify yout email');
    };

    const _handlePasswordChange = (password) => {
        setPassword(removeWhitespace(password));
    };

    //비밀번호를 입력하는 input 컴포넌트의 onSubmitEditing과 signin버튼에서 호출되는 onPress가 같은 함수를 바라보도록 하는 함수
    const _handleSigninBtnPress = async () => {
        try {
            const user = await signin({ email, password });
            navigation.navigate('Profile', { user });
        } catch (e) {
            Alert.alert('Signin Error', e.message);
        }
    };
    return (
        <KeyboardAwareScrollView extraScrollHeight={20} contentContainerStyle={{ flex: 1 }}>
            <Container insets={insets}>
                <Image url={LOGO} />
                <CheckInput
                    label='Email'
                    placeholder='Email'
                    returnKeyType='next'
                    value={email}
                    onChangeText={_handleEmailChange}
                    onSubmitEditing={() => refPassword.current.focus()}
                />
                <CheckInput
                    ref={refPassword}
                    label='Password'
                    placeholder='Password'
                    returnKeyType='done'
                    value={password}
                    onChangeText={_handlePasswordChange}
                    isPassword={true}
                    onSubmitEditing={_handleSigninBtnPress}
                />
                <ErrorMessage message={errorMessage} />
                <Button title='sign up' onPress={_handleSigninBtnPress} disabled={disabled} />
                <Button
                    title='or sign up'
                    onPress={() => navigation.navigate('Signup')}
                    containerStyle={{ marginTop: 0, backgroundColor: 'transparent' }}
                    textStyle={{ color: theme.btnTextLink, fontSize: 18 }}
                />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Signin;

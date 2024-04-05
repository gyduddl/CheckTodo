import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { Button, Image, CheckInput, ErrorMessage } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert, Platform } from 'react-native';
import { signup } from '../firebase';
import { validateEmail, removeWhitespace } from '../utils';
import { useRecoilState } from 'recoil';
import { spinnerAtom } from '../contexts/Progress';
import { userAtom } from '../contexts/User';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    ${Platform.select({
        ios: `
        padding: 50px 20px;
        `,
        android: `
        padding: 30px 20px;
        `,
    })}
`;

const DEFAULT_PHOTO = `https://firebasestorage.googleapis.com/v0/b/checktodo-68e26.appspot.com/o/face.png?alt=media`;

const Signup = ({ navigation }) => {
    const [inProgress, setInProgress] = useRecoilState(spinnerAtom);
    const [userState, setUserState] = useRecoilState(userAtom);

    const [photo, setPhoto] = useState(DEFAULT_PHOTO);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);

    const refEmail = useRef(null);
    const refPassword = useRef(null);
    const refPasswordConfirm = useRef(null);
    //회원가입 창이 마운트 되자마자 유효성 검사가 뜨는 것을 방지하는 것
    const refDidMount = useRef(null);

    //disabled 설정함수
    useEffect(() => {
        setDisabled(!(name && email && password && passwordConfirm && !errorMessage));
    }, [email, name, passwordConfirm, password, errorMessage]);

    // 유효성검사
    useEffect(() => {
        if (refDidMount.current) {
            //refDidMount의 current가 true일때에만 동작하도록 설정
            let error = '';
            if (!name) {
                error = 'Please enter yout name';
            } else if (!email) {
                error = 'Please enter your email';
            } else if (!validateEmail(email)) {
                error = ' Please verify your email';
            } else if (password.length < 6) {
                error = 'The password must contain 6 characters at least';
            } else if (password !== passwordConfirm) {
                error = 'Password need to match';
            } else {
                error = '';
            }
            setErrorMessage(error);
        } else {
            refDidMount.current = true;
        }
    }, [email, name, password, passwordConfirm]);

    // 회원가입 기능
    const _handleSignupBtnPress = async () => {
        try {
            setInProgress(true);
            const user = await signup({ name, email, password, photo });
            // setUser(user);
            setUserState({ uid: user.uid });
        } catch (e) {
            Alert.alert('Signup Error', e.message);
        } finally {
            setInProgress(false);
        }
    };

    return (
        <KeyboardAwareScrollView extraScrollHeight={20}>
            <Container>
                <Image showButton={true} url={photo} onChangePhoto={setPhoto} />
                <CheckInput
                    label='Name'
                    placeholder='Name'
                    returnKeyType='next'
                    value={name}
                    onChangeText={setName}
                    onSubmitEditing={() => refEmail.current.focus()}
                    onBlur={() => setName(name.trim())}
                    maxLength={12}
                />
                <CheckInput
                    label='Email'
                    ref={refEmail}
                    placeholder='Email'
                    returnKeyType='next'
                    value={email}
                    onChangeText={setEmail}
                    onSubmitEditing={() => refPassword.current.focus()}
                    onBlur={() => setEmail(removeWhitespace(email))}
                />

                <CheckInput
                    ref={refPassword}
                    label='Password'
                    placeholder='Password'
                    returnKeyType='next'
                    value={password}
                    onChangeText={setPassword}
                    isPassword={true}
                    onSubmitEditing={() => refPasswordConfirm.current.focus()}
                    onBlur={() => setPassword(removeWhitespace(password))}
                />
                <CheckInput
                    label='PasswordConfirm'
                    ref={refPasswordConfirm}
                    placeholder='PasswordConfirm'
                    returnKeyType='done'
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                    isPassword={true}
                    onSubmitEditing={_handleSignupBtnPress}
                    onBlur={() => setPasswordConfirm(removeWhitespace(passwordConfirm))}
                />
                <ErrorMessage message={errorMessage} />
                <Button title='sign up' onPress={_handleSignupBtnPress} disabled={disabled} />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Signup;

import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import { Button, Image, CheckInput } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Platform } from 'react-native';

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

// const LOGO = `https://firebasestorage.googleapis.com/v0/b/checktodo-68e26.appspot.com/o/face.png?alt=media`;

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const refEmail = useRef(null);
    const refPassword = useRef(null);
    const refPasswordConfirm = useRef(null);

    //비밀번호를 입력하는 input 컴포넌트의 onSubmitEditing과 signup버튼에서 호출되는 onPress가 같은 함수를 바라보도록 하는 함수
    const _handleSignupBtnPress = () => {
        console.log('signup');
    };
    return (
        <KeyboardAwareScrollView extraScrollHeight={20}>
            <Container>
                <Image />
                <CheckInput
                    label='Name'
                    placeholder='Name'
                    returnKeyType='next'
                    value={name}
                    onChangeText={setName}
                    onSubmitEditing={() => refEmail.current.focus()}
                />
                <CheckInput
                    label='Email'
                    ref={refEmail}
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
                    returnKeyType='next'
                    value={password}
                    onChangeText={setPassword}
                    isPassword={true}
                    onSubmitEditing={() => refPasswordConfirm.current.focus()}
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
                />
                <Button title='sign up' onPress={_handleSignupBtnPress} />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Signup;

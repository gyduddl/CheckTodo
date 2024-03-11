import react from 'react';
import styled from 'styled-components/native';
import { Dimensions, useWindowDimensions } from 'react-native';

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.main,
}))`
    width: ${({ width }) => width - 40}px;
    height: 60px;
    margin: 3px 0;
    padding: 15px 20px;
    border-radius: 25px;
    font-size: 25px;
    background-color: ${({ theme }) => theme.itemBackground};
    color: ${({ theme }) => theme.text};
`;
<<<<<<< Updated upstream

const Input = ({ placeholder }) => {
=======
//develop 추가
const Input = ({ placeholder, value, onChangeText, onSubmitEditing }) => {
>>>>>>> Stashed changes
    // const width = Dimensions.get('window').width;
    const width = useWindowDimensions().width;
    // maxLength=> 최대 50의 길이만 받을 수 있다.
    return (
        <StyledInput
            width={width}
            placeholder={placeholder}
            maxLength={50}
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType='done'
            keyboardAppearance='dark'
        />
    );
};

export default Input;

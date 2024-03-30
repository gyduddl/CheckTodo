import React, { useState, forwardRef } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';

const Container = styled.View`
    flex-direction: column;
    width: 100%;
    margin: 10px 0;
`;

const Label = styled.Text`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
    color: ${({ theme, isFocused }) => (isFocused ? theme.main : theme.inputLabel)};
`;

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.inputPlaceholder,
}))`
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.text2};
    ${Platform.select({
        ios: `
            padding: 20px 10px;
        `,
        android: `
            padding: 15px 10px;
        `,
    })}
    font-size: 16px;
    border: 1px solid ${({ theme, isFocused }) => (isFocused ? theme.main : theme.inputBorder)};
    border-radius: 4px;
`;

const CheckInput = forwardRef(
    (
        { label, value, onChangeText, onSubmitEditing, onBlur, placeholder, returnKeyType, maxLength, isPassword },
        ref
    ) => {
        //focus 상태 관리
        const [isFocused, setIsFocused] = useState(false);
        return (
            <Container>
                <Label isFocused={isFocused}>{label}</Label>
                <StyledInput
                    ref={ref}
                    value={value}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmitEditing}
                    onBlur={() => {
                        setIsFocused(false); //focus를 잃었을 경우
                        onBlur();
                    }}
                    placeholder={placeholder}
                    returnKeyType={returnKeyType}
                    maxLength={maxLength}
                    autoCapitalize='none'
                    autoCorrect={false}
                    textContentType='none' //이메일 나타나는것 방지
                    isFocused={isFocused}
                    onFocus={() => setIsFocused(true)}
                    secureTextEntry={isPassword}
                />
            </Container>
        );
    }
);

CheckInput.defaultProps = {
    onBlur: () => {},
};

CheckInput.prototype = {
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    returnKeyType: PropTypes.oneOf(['done', 'next']),
    maxLength: PropTypes.number,
    isPassword: PropTypes.bool,
};

export default CheckInput;

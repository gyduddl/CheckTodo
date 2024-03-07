import React,{useState} from 'react';
import styled from 'styled-components/native';

const StyledInput = styled.TextInput.attrs(({placeholder,theme})=>({
    // props로 받은 placeholder이 있으면 그것 표시 아니면 그전의 값 출력
    placeholder:placeholder||'hi other',
    placeholderTextColor:theme.inputColor, 
}))`
    padding: 20px;
    font-size: 20px;
    border: 1px solid ${({theme})=> theme.inputBoder};
`;

const Input2 =({placeholder})=>{ 
    const [text,setText] = useState('')
    return (<StyledInput 
        onChangeText={text => setText(text)} 
        text ={text} 
        placeholder={placeholder}/>)

}

export default Input2;
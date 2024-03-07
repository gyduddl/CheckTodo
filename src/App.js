import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import styled,{ThemeProvider} from 'styled-components/native';
import { Switch } from 'react-native';
import Input2 from './Input2';

const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=>theme.bgColor};
    align-items: center;
    justify-content: center;
`;

//라이트 테마
const lightTheme = {
  inputColor:'#111111',
  inputBoder: "#111111",
  bgColor: "#e3e3e3"
}

//다크 테마
const darkTheme = {
  inputColor: '#e3e3e3',
  inputBoder: "#e3e3e3",
  bgColor: "#111111"
}

export default function App() {
  const [isLight, toggleTheme] = useState(true);
  return (
    <ThemeProvider theme={isLight?darkTheme:lightTheme}>
    <Container>
      <StatusBar style='auto'/>
      <Switch value={isLight} onValueChange={isLight=>toggleTheme(isLight)}/>
      <Input2 placeholder="Type a message..."/>
    </Container>
    </ThemeProvider>
  );
}

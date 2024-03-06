import React from 'react';
// import { StyleSheet, View, TextInput} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled,{css } from 'styled-components/native';

// View컴포넌트를 실제로 사용한 것이 아니기에 View를 import할 필요 없다.
const Container = styled.View`
    flex: 1;
    background-color: #e3e3e3;
    align-items: center;
    justify-content: center;
`;

const cssText =css`
  font-size:20px;
  font-weight: 600;
`
const StyledText= styled.Text`
  ${cssText}
  color:blue;
`;
const ErrorText = styled(StyledText)`
  color:red
`;
const StyledButton = styled.Button``;

export default function App() {
  return (
    <Container>
      <StatusBar style='auto'/>
      <StyledText>styled components</StyledText>
      <ErrorText>Error !</ErrorText>
      <StyledButton title="Styled" onPress={()=>alert('haha')}/>
    </Container>
  );
}

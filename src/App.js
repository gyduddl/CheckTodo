import React, { useState } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/Input';
import Task from './components/Task';

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    align-items: center;
    justify-content: flex-start;
`;
const Title = styled.Text`
    font-size: 40px;
    font-weight: 600;
    color: ${({ theme }) => theme.main};
    width: 100%;
    align-items: flex-end;
    padding: 0 20px;
`;

const List = styled.ScrollView`
    width: ${({ width }) => width - 40}px;
    flex: 1;
`;

export default function App() {
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        alert(newTask);
        setNewTask('');
    };
    const width = Dimensions.get('window').width;
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar barStyle='light-content' backgroundColor={theme.background} />
                <Title>TODO List</Title>
                <Input
                    placeholder='+ Add a Task'
                    value={newTask}
                    onChangeText={(text) => setNewTask(text)}
                    onSubmitEditing={addTask}
                />
                <List width={width}>
                    <Task text='React Native' />
                    <Task text='React Native1' />
                    <Task text='React Native2' />
                    <Task text='React Native3' />
                    <Task text='React Native4' />
                    <Task text='React Native5' />
                    <Task text='React Native6' />
                    <Task text='React Native7' />
                    <Task text='React Native8' />
                    <Task text='React Native9' />
                    <Task text='React Native10' />
                    <Task text='React Native11' />
                    <Task text='React Native12' />
                </List>
            </Container>
        </ThemeProvider>
    );
}

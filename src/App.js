import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/input';
import IconButton from './components/IconButton';
import { icons } from './icons';

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

export default function App() {
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        alert(newTask);
        setNewTask('');
    };
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
                <IconButton icon={icons.check} onPress={() => alert('check')} />
                <IconButton icon={icons.uncheck} onPress={() => alert('uncheck')} />
                <IconButton icon={icons.edit} onPress={() => alert('edit')} />
                <IconButton icon={icons.delete} onPress={() => alert('delete')} />
            </Container>
        </ThemeProvider>
    );
}

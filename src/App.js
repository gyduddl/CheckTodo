import React, { useState } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/input';
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
    const width = Dimensions.get('window').width;

    //input 창 텍스트 입력
    const [newTask, setNewTask] = useState('');

    //할일 목록(임시데이터)
    const tempData = {
        1: { id: '1', text: 'React Native', completed: false },
        2: { id: '2', text: 'Expo', completed: true },
        3: { id: '3', text: 'JavasScript', completed: false },
    };

    //할일 목록 관리 상태 변수
    const [tasks, setTasks] = useState(tempData);

    //목록 추가 함수
    const addTask = () => {
        if (newTask.length < 1) {
            // newTask 값이 빈 배열이면 addTask 함수 안돌아가도록 설정
            return;
        }
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: { id: ID, text: newTask, completed: false },
        };
        alert(newTask);
        setNewTask('');
        setTasks({ ...tasks, ...newTaskObject });
    };

    //목록 삭제 함수
    const deleteTask = (id) => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        setTasks(currentTasks);
    };

    //목록 완료 함수 toggle
    const toggleTask = (id) => {
        const currentTasks = Object.assign({}, tasks);
        //선택된 id의 completed값을 반대로 설정
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        setTasks(currentTasks);
    };

    //수정된 목록 update
    const updateTask = (item) => {
        const currentTasks = Object.assign({}, tasks);
        //현재 목록에서 수정하는 아이템 전체를 변경
        currentTasks[item.id] = item;
        setTasks(currentTasks);
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
                    onBlur={() => setNewTask('')} //입력이 종료되었을떄 빈배열로
                />
                <List width={width}>
                    {/* 최근에 쓴 내용이 제일 위로 가도록 reverse */}
                    {Object.values(tasks)
                        .reverse()
                        .map((items) => (
                            <Task
                                key={items.id}
                                item={items}
                                deleteTask={deleteTask}
                                toggleTask={toggleTask}
                                updateTask={updateTask}
                            />
                        ))}
                </List>
            </Container>
        </ThemeProvider>
    );
}

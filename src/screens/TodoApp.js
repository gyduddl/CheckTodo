import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Input, Task } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 0 20px;
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

const TodoApp = () => {
    const width = Dimensions.get('window').width;

    //input 창 텍스트 입력
    const [newTask, setNewTask] = useState('');

    //할일 목록 관리 상태 변수
    const [tasks, setTasks] = useState({});

    //local 데이터 저장
    const storeData = async (tasks) => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        } catch (e) {
            //
        }
    };

    //local에 저장된 데이터 불러오기
    const getData = async () => {
        try {
            const loadedData = await AsyncStorage.getItem('tasks');
            setTasks(JSON.parse(loadedData || '{}'));
        } catch (e) {
            //
        }
    };

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
        storeData({ ...tasks, ...newTaskObject });
    };

    //목록 삭제 함수
    const deleteTask = (id) => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        storeData(currentTasks);
    };

    //목록 완료 함수 toggle
    const toggleTask = (id) => {
        const currentTasks = Object.assign({}, tasks);
        //선택된 id의 completed값을 반대로 설정
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        storeData(currentTasks);
    };

    //수정된 목록 update
    const updateTask = (item) => {
        const currentTasks = Object.assign({}, tasks);
        //현재 목록에서 수정하는 아이템 전체를 변경
        currentTasks[item.id] = item;
        storeData(currentTasks);
    };

    //앱 로딩
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await getData();
            } catch (e) {
                () => {};
            } finally {
                setIsReady(true);
            }
        }

        prepare();
    }, []);

    return isReady ? (
        <Container>
            <Title>TODO List</Title>
            <Input
                placeholder='+ Add a Task'
                value={newTask}
                onChangeText={(text) => {
                    setNewTask(text);
                }}
                onSubmitEditing={addTask}
                onBlur={() => setNewTask('')} //입력이 종료되었을떄 빈배열로
            />
            <List width={width}>
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
    ) : (
        []
    );
};

export default TodoApp;

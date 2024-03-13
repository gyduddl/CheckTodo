import React, { useEffect, useState } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/input';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();

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

    //할일 목록 관리 상태 변수
    const [tasks, setTasks] = useState({});

    //local 데이터 저장
    const storeData = async (tasks) => {
        try {
            //저장할 객체를 전달 받고 'task'라는 키와 JSON.stringify를 활용해
            //전달된 객체를 문자열로 만들어서 저장
            // 저장이 완료되면 전달된 데이터를 setTasks에 설정해서 최신 데이터를 유지하도록 설정
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            console.log(AsyncStorage.getItem('tasks'));
            setTasks(tasks);
        } catch (e) {
            //
        }
    };

    //local에 저장된 데이터 불러오기
    const getData = async () => {
        try {
            const loadedData = await AsyncStorage.getItem('tasks');
            //가져온 데이터는 문자열이기에 json.parse를 통해 객체형태로 변경
            // 저장된 데이터가 없으면 json.parse에서 에러가 날수 있으니 데이터가 없으면
            // 빈객체의 string형태로 처리하도록 설정
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
    ) : (
        []
    );
}

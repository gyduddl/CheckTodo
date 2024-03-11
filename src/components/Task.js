// 목록 컴포넌트
import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { icons } from '../icons';
import Input from './input';

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme.itemBackground};
    border-radius: 10px;
    padding: 5px;
    margin: 3px 0;
`;
const Contents = styled.Text`
    flex: 1;
    font-size: 24px;
    color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
    text-decoration-line: ${({ completed }) => (completed ? 'line-through' : 'none')};
`;

const Task = ({ item, deleteTask, toggleTask, updateTask }) => {
    //수정 상태를 관리하는 상태 변수
    const [isEditing, setIsEditing] = useState(false);
    //수정되는 항목의 텍스트를 관리하는 상태변수
    const [text, setText] = useState(item.text);
    //수정 완료 버튼 클릭시 isEditing의 값을 false로 변경하는 함수
    const _onSubmit = () => {
        //isEditing이 ture일떄만 동작
        if (isEditing) {
            const updateItem = Object.assign({}, item);
            updateItem['text'] = text;
            setIsEditing(false);
            updateTask(updateItem);
        }
    };
    return isEditing ? (
        <Input
            value={text}
            onChangeText={(text) => setText(text)}
            onSubmitEditing={_onSubmit}
            onBlur={() => {
                setText(item.text);
                setIsEditing(false); //편집모드도 꺼줘야함
            }}
        />
    ) : (
        <Container>
            <IconButton icon={item.completed ? icons.check : icons.uncheck} item={item} onPress={toggleTask} />
            <Contents completed={item.completed}>{item.text}</Contents>
            {/* completed가 참이면 edit icons이 렌더링되지 않도록 설정 */}
            {item.completed || <IconButton icon={icons.edit} onPress={() => setIsEditing(true)} />}
            <IconButton icon={icons.delete} item={item} onPress={deleteTask} />
        </Container>
    );
};

Task.propTypes = {
    // App.js에서 전달받은 item은 객체이기에
    item: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
};

export default Task;

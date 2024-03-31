// 목록 컴포넌트
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { icons } from '../icons';
import Input from './input';

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme.main};
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
// 만약 icon을 누리면 isEditing이 true가 된다.
// item.completed는 어떤거지..아이템의 completed를 확인하는 부분인데 -> check uncheck를 확인해주는 부분이군
// item.completed는 상관없다는 것이고 편집 모드를 누르면 isEditing이 true가 된다는것
//이것은 input형태로 바꿔준다는 것
// input창에서 onBlue를 눌렀을떄 즉, 포커스가 해제되었을 때 isEditing이 false가 된다는 뜻
// 1. 그렇다면 iconButton을 눌렀을 때 즉,onpress를 했을 때 input으로 포커스가 되어야 한다.(안됨)
// 2. 그렇다면 iconButton을 누르고 위의 input을 눌렀을시 isEditing이 false가 되어야 한다는 것
// 2-1. 상위 컴포넌트인 TodoApp에다가 state를 설정해주고 input 눌렀을
//
Task.propTypes = {
    // App.js에서 전달받은 item은 객체이기에
    item: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
};

export default Task;

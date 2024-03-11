import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { icons } from '../icons'; //객체형태

const Icon = styled.Image`
    width: 30px;
    height: 30px;
    margin: 10px;
    tint-color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
`;

const IconButton = ({ icon, onPress, item }) => {
    //아이콘 버튼에서 onpressevent가 발생할때 전달되어온 함수의
    // 파라미터 id를 전달해야하기 때문에 prop로 전달된 onPress가 호출될떄
    // id를 파라미터로 전달되도록 설정...
    const _onPress = () => {
        onPress(item.id);
    };
    return (
        <TouchableOpacity onPress={_onPress}>
            <View>
                <Icon source={icon} completed={item.completed} />
            </View>
        </TouchableOpacity>
    );
};

// edit icons은 completed가 true이면 사라지니 props로 전달해줄 필요 없다.
// 하지만 없으면 에러가 나니 defaultProps로 기본 값을 설정해준다.
IconButton.defaultProps = {
    item: { completed: false },
};

IconButton.propTypes = {
    icon: PropTypes.oneOf(Object.values(icons)).isRequired,
    onPress: PropTypes.func,
    item: PropTypes.object,
};

export default IconButton;

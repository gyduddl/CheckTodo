import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { icons } from '../icons';

const Icon = styled.Image`
    width: 30px;
    height: 30px;
    margin: 10px;
    tint-color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
`;

const IconButton = ({ icon, onPress, item }) => {
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

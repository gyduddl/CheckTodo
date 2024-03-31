//**채널 생성 화면 */

import React from 'react';
import styled from 'styled-components/native';
import { Button } from '../components';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.backgroud};
`;

const StyledText = styled.Text`
    font-size: 30px;
`;

const ChannelCreation = ({ navigation }) => {
    return (
        <Container>
            <StyledText>Channel Creation</StyledText>
            <Button title='Create' onPress={() => navigation.replace('Channel')} />
        </Container>
    );
};

export default ChannelCreation;

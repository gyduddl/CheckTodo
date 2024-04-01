//**채널 화면 */

import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.backgroud};
`;

const StyledText = styled.Text`
    font-size: 30px;
`;

const Channel = ({ route }) => {
    return (
        <Container>
            <StyledText>Channel</StyledText>
            <StyledText>{route.params.id}</StyledText>
            <StyledText>{route.params.title}</StyledText>
        </Container>
    );
};

export default Channel;

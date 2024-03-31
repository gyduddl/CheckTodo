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

const Channel = () => {
    return (
        <Container>
            <StyledText>Channel</StyledText>
        </Container>
    );
};

export default Channel;

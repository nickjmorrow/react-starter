import * as React from 'react';
import styled from 'styled-components';
import { Typography } from '~/core/Typography';

export const Header: React.FC = () => {
    return (
        <StyledHeader>
            <AppName>Zesty Bagels</AppName>
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 16px;
`;

const AppName = styled(Typography)``;

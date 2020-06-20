import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import * as React from 'react';

export const Link: React.FC<{ route: string; children: React.ReactNode }> = ({ route, children }) => {
    return <StyledLink to={route}>{children}</StyledLink>;
};

const StyledLink = styled(RouterLink)``;

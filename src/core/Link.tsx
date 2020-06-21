import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import * as React from 'react';
import { Typography } from '~/core/Typography';

export const Link: React.FC<{ route: string; children: React.ReactNode; className?: string }> = ({
    route,
    children,
    className,
}) => {
    return (
        <StyledLink className={className} to={route}>
            <Typography>{children}</Typography>
        </StyledLink>
    );
};

const StyledLink = styled(RouterLink)`
    text-decoration: none;
`;

import * as React from 'react';
import { Link } from '~/core/Link';
import styled from 'styled-components';
import { componentRouteMappings } from '~/landing/componentRouteMappings';

export const SideNav: React.FC = () => {
    return (
        <StyledNav>
            <Link route={'/counter'}>Counter</Link>
            <Link route={'/simple-counter'}>Simple Counter</Link>
            {componentRouteMappings.map(crm => (
                <Link key={crm.route} route={crm.route}>
                    {crm.label}
                </Link>
            ))}
        </StyledNav>
    );
};

const StyledNav = styled.nav`
    display: flex;
    flex-direction: column;
`;

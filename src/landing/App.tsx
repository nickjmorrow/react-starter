// external
import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router';
import 'normalize.css';

// inter
import { NotFound } from '~/core/NotFound';
import { componentRouteMappings } from '~/core/componentRouteMappings';

// intra
import { Header } from '~/landing/Header';
import { SideNav } from '~/landing/SideNav';
import { Footer } from '~/landing/Footer';

export const App: React.SFC = () => {
    return (
        <Container>
            <Header />
            <Body>
                <SideNav />
                <Main>
                    <Switch>
                        {componentRouteMappings.map(crm => (
                            <Route key={crm.route} path={crm.route} component={crm.component} />
                        ))}
                        <Route component={NotFound} />
                    </Switch>
                </Main>
            </Body>
            <Footer />
        </Container>
    );
};

const Body = styled.div`
    display: flex;
    flex: 1;
`;

const Main = styled.main`
    flex: 1;
`;

const Container = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
`;

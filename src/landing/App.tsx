import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../RootState';
import { Switch, Route } from 'react-router';
import { Counter } from '~/components/Counter';
import { FetchData } from '~/components/FetchData';
import { NotFound } from '~/components/NotFound';
import { Header } from '~/landing/Header';
import { SideNav } from '~/landing/SideNav';
import { SimpleCounter } from '~/counting/SimpleCounter';
import { componentRouteMappings } from '~/landing/componentRouteMappings';

export const App: React.SFC = () => {
    return (
        <Container>
            <Header />
            <Body>
                <SideNav />
                <Main>
                    <Switch>
                        <Route exact path="/simple-counter" component={SimpleCounter} />
                        <Route path="/counter" component={Counter} />
                        <Route path="/fetch-data" component={FetchData} />
                        {componentRouteMappings.map(crm => (
                            <Route key={crm.route} path={crm.route} component={crm.component} />
                        ))}
                        <Route component={NotFound} />
                    </Switch>
                </Main>
            </Body>
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

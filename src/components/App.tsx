import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../RootState';
import { Switch, Route } from 'react-router';
import { Home } from '~/components/Home';
import { Counter } from '~/components/Counter';
import { FetchData } from '~/components/FetchData';
import { NotFound } from '~/components/NotFound';
import { Layout } from '~/components/Layout';

interface AppProps {
    name: string;
}

type ContainerProps = {
    padding?: string | 0;
    margin?: string | 0;
};

export const Container = styled.div<ContainerProps>`
    padding: ${props => ('padding' in props ? props.padding : '0')};
    margin: ${props => ('margin' in props ? props.margin : 0)};
`;

export default function App({ name }: AppProps) {
    const todos = useSelector((state: RootState) => state.todosState.todos);
    console.log(todos);
    return (
        <Container padding="1em">
            <Layout>
                <span>Testing 1!</span>
                {todos.map(t => (
                    <span key={t.todoId}>{t.description}</span>
                ))}
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/counter" component={Counter} />
                    <Route path="/fetch-data" component={FetchData} />
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </Container>
    );
}

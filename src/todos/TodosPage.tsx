import * as React from 'react';
import styled from 'styled-components';
import { TodoList } from '~/todos/TodoList';
import { CreateTodo } from '~/todos/CreateTodo';

export const TodosPage: React.FC = () => {
    return (
        <Container>
            <TodoList />
            <CreateTodo />
        </Container>
    );
};

const Container = styled.div``;

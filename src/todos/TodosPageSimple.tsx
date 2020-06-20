import * as React from 'react';
import { Todo as TodoType } from '~/todos/types/Todo';
import { useState } from 'react';
import styled from 'styled-components';
import { Todo } from '~/todos/Todo';
import { CreateTodoSimple } from '~/todos/CreateTodoSimple';

export const TodosPageSimple: React.FC = () => {
    const initialTodos: TodoType[] = [
        { todoId: 1, description: 'first todo' },
        { todoId: 2, description: 'second todo' },
    ];
    const [todos, setTodos] = useState(initialTodos);
    const handleClick = (description: string): void => {
        const todoId = Math.max(...todos.map(t => t.todoId)) + 1;
        const newTodo = { todoId, description };
        const newTodos = [...todos, newTodo];
        setTodos(newTodos);
    };
    return (
        <Container>
            {todos.map(t => (
                <Todo todo={t} key={t.todoId} />
            ))}
            <CreateTodoSimple onClick={handleClick} />
        </Container>
    );
};

const Container = styled.div``;

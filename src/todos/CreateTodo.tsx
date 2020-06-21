import * as React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Input } from '~/core/Input';
import { Button } from '~/core/Button';
import { todoActions } from '~/todos/todoActions';
import { Typography } from '~/core/Typography';
import { testingElementIds } from '~/core/testingElementIds';

export const CreateTodo: React.FC = () => {
    const dispatch = useDispatch();
    const [description, setDescription] = React.useState('');
    const handleClick = (): void => {
        dispatch(todoActions.addTodo(description));
        setDescription('');
    };

    return (
        <Container>
            <Typography>Create Todo</Typography>
            <Input
                value={description}
                onChange={(e): void => setDescription(e.currentTarget.value)}
                data-test={testingElementIds.createTodoInput}
            />
            <Button onClick={handleClick}>Submit</Button>
        </Container>
    );
};

const Container = styled.div``;

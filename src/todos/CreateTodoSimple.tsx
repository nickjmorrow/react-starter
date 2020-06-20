import * as React from 'react';
import styled from 'styled-components';
import { Input } from '~/core/Input';
import { Button } from '~/core/Button';
import { Typography } from '~/core/Typography';

export const CreateTodoSimple: React.FC<{ onClick: (description: string) => void }> = ({ onClick: handleClick }) => {
    const [description, setDescription] = React.useState('');

    const handleClickInternal = (): void => handleClick(description);
    return (
        <Container>
            <Typography>Create Todo</Typography>
            <Input value={description} onChange={(e): void => setDescription(e.currentTarget.value)} />
            <Button onClick={handleClickInternal}>Submit</Button>
        </Container>
    );
};

const Container = styled.div``;

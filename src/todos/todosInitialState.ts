import { Todo } from '../todos/types/Todo';

const todos: Todo[] = [
    { todoId: 1, description: 'todo 1' },
    { todoId: 2, description: 'todo 2' },
    { todoId: 3, description: 'todo 3' },
];

export const todosInitialState = {
    todos: todos,
};

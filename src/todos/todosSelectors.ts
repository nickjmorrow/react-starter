import { TodosState } from '~/todos/TodosState';
import { Todo } from '~/todos/types/Todo';

interface AppState {
    todosState: TodosState;
}

const getTodos = (state: AppState): Todo[] => state.todosState.todos;

export const todosSelectors = {
    getTodos,
};

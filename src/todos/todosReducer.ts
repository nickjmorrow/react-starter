import { todoActions } from './todosActions';
import { TodosState } from '~/todos/TodosState';
import { ActionType, getType } from 'typesafe-actions';
import { produce } from 'immer';

export const todosReducer = (state: TodosState, action: ActionType<typeof todoActions>) => {
    switch (action.type) {
        case getType(todoActions.addTodo):
            const todoId = state.todos.reduce((agg, cur) => Math.max(cur.todoId, agg), 0) + 1;
            return produce(state, draftState => {
                draftState.todos.push({ todoId, description: action.payload });
            });
        case getType(todoActions.removeTodo):
            return produce(state, draftState => {
                const index = draftState.todos.findIndex(t => t.todoId === action.payload.todoId);
                draftState.todos.splice(index, 1);
            });
        case getType(todoActions.updateTodo):
            return produce(state, draftState => {
                const index = draftState.todos.findIndex(t => t.todoId === action.payload.todoId);
                draftState.todos[index] = action.payload;
            });
        default:
            return state;
    }
};

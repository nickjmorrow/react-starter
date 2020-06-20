import { TodosPage } from '~/todos/TodosPage';
import { TodosPageSimple } from '~/todos/TodosPageSimple';
import { Home } from '~/landing/Home';

export const componentRouteMappings = [
    {
        component: TodosPage,
        route: '/todos',
        label: 'Todos',
    },
    {
        component: TodosPageSimple,
        route: '/todos-simple',
        label: 'Todos Simple',
    },
    {
        component: Home,
        route: '/',
        label: 'Home',
    },
];

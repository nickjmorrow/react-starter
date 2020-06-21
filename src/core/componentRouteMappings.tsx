import { TodosPage } from '~/todos/components/TodosPage';
import { Home } from '~/landing/Home';

export const componentRouteMappings = [
    {
        component: TodosPage,
        route: '/todos',
        label: 'Todos',
    },
    {
        component: Home,
        route: '/',
        label: 'Home',
    },
];

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { TodosPageSimple } from '~/todos/TodosPageSimple';

let container = (null as unknown) as HTMLDivElement;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    (container as unknown) = null;
});

it('renders with or without a name', () => {
    act(() => {
        render(<TodosPageSimple />, container);
        const input = container.getElementsByTagName('input')[0];

        const button = container.getElementsByTagName('button')[0];
        button.click();
    });
    console.log(container.textContent);
});

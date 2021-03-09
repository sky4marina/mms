import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Filter } from './index';


describe('<Filter />', () => {
    test('renders all radio', () => {
        render(<Filter issueState={'all'} onStateClick={jest.fn()}/>);
        expect(screen.getByText('All')).toBeInTheDocument();
    });

    test('renders closed radio', () => {
        render(<Filter issueState={'all'} onStateClick={jest.fn()}/>);
        expect(screen.getByText('Closed')).toBeInTheDocument();
    });

    test('renders open radio', () => {
        render(<Filter issueState={'all'} onStateClick={jest.fn()}/>);
        expect(screen.getByText('Open')).toBeInTheDocument();
    });
});
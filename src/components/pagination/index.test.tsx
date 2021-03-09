import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import { Pagination } from './index';

describe('<Pagination />', () => {
    test('renders next button disables if hasNextPage false', () => {
        render(
            <Pagination
                handleLoadNextClick={jest.fn()}
                handlePreviousClick={jest.fn()}
                hasNextPage={false}
                hasPreviousPage={false}
            />
        );
        const button = screen.getByText('Next page').closest('button') as HTMLButtonElement;
        expect(button.disabled).toEqual(true);
    });

    test('renders next button enabled if hasNextPage true', () => {
        render(
            <Pagination
                handleLoadNextClick={jest.fn()}
                handlePreviousClick={jest.fn()}
                hasNextPage={true}
                hasPreviousPage={false}
            />
        );
        const button = screen.getByText('Next page').closest('button') as HTMLButtonElement;
        expect(button.disabled).toEqual(false);
    });


    test('renders prev button enabled if hasPreviousPage true', () => {
        render(
            <Pagination
                handleLoadNextClick={jest.fn()}
                handlePreviousClick={jest.fn()}
                hasNextPage={true}
                hasPreviousPage={true}
            />
        );
        const button = screen.getByText('Previous page').closest('button') as HTMLButtonElement;
        expect(button.disabled).toEqual(false);
    });

    test('renders prev button disabled if hasPreviousPage false', () => {
        render(
            <Pagination
                handleLoadNextClick={jest.fn()}
                handlePreviousClick={jest.fn()}
                hasNextPage={true}
                hasPreviousPage={false}
            />
        );
        const button = screen.getByText('Previous page').closest('button') as HTMLButtonElement;
        expect(button.disabled).toEqual(true);
    });

    test('calls handleLoadNextClick', () => {
        const handleLoadNextClick = jest.fn();
        render(
            <Pagination
                handleLoadNextClick={handleLoadNextClick}
                handlePreviousClick={jest.fn()}
                hasNextPage={true}
                hasPreviousPage={false}
            />
        );
        const button = screen.getByText('Next page').closest('button') as HTMLButtonElement;
        fireEvent.click(button);
        expect(handleLoadNextClick).toHaveBeenCalled();
    });

    test('calls handlePreviousClick', () => {
        const handlePreviousClick = jest.fn();
        render(
            <Pagination
                handleLoadNextClick={jest.fn()}
                handlePreviousClick={handlePreviousClick}
                hasNextPage={true}
                hasPreviousPage={true}
            />
        );
        const button = screen.getByText('Previous page').closest('button') as HTMLButtonElement;
        fireEvent.click(button);
        expect(handlePreviousClick).toHaveBeenCalled();
    });
});
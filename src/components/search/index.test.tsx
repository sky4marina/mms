import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Search} from './index';

describe('<Search />', () => {
    test('renders search button', () => {
        render(<Search setSearchInput={jest.fn()} onSearchClick={jest.fn()} searchInput=""/>);
        expect(screen.getByText('Search')).toBeInTheDocument();
    });

    test('renders input', () => {
        render(<Search setSearchInput={jest.fn()} onSearchClick={jest.fn()} searchInput=""/>);
        expect(screen.getByPlaceholderText('Type to search')).toBeInTheDocument();
    });

    test('renders input with value', () => {
        render(<Search setSearchInput={jest.fn()} onSearchClick={jest.fn()} searchInput="bug"/>);
        expect(screen.getByPlaceholderText('Type to search').closest('input')?.value).toEqual('bug');
    });

    test('calls onSearchClick', () => {
        const onSearchClick = jest.fn();
        render(<Search setSearchInput={jest.fn()} onSearchClick={onSearchClick} searchInput="bug"/>);
        const button = screen.getByText('Search').closest('button') as HTMLButtonElement;
        fireEvent.click(button);
        expect(onSearchClick).toHaveBeenCalled();
    });

    test('calls setSearchInput', () => {
        const setSearchInput = jest.fn();
        render(<Search setSearchInput={setSearchInput} onSearchClick={jest.fn()} searchInput="bug"/>);
        const input = screen.getByPlaceholderText('Type to search').closest('input') as HTMLButtonElement;
        fireEvent.change(input,{
            target: {
                value: 'test',
            }});
        expect(setSearchInput).toHaveBeenCalledWith('test');
    });
});
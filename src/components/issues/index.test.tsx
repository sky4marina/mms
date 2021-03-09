import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Issues } from './index';
import { BrowserRouter } from "react-router-dom";

const searchResult = {
    search: {
        edges: [
            {
                cursor: 'test cursor 1',
                node: {
                    id: 'test id 1',
                    title: 'test title 1',
                    number: 1,
                    state: 'OPEN'
                }
            },
            {
                cursor: 'test cursor 2',
                node: {
                    id: 'test id 2',
                    title: 'test title 2',
                    number: 2,
                    state: 'OPEN'
                }
            },
            {
                cursor: 'test cursor 3',
                node: {
                    id: 'test id 3',
                    title: 'test title 3',
                    number: 3,
                    state: 'OPEN'
                }
            }
        ]
    }
};

jest.mock('../../utils/use-search-issues', () => ({
    useSearchIssues: () => ({
        error: null,
        loading: false,
        searchResult,
        totalIssue: 20,
        handleOnSearchClick: jest.fn(),
        handleLoadNextClick: jest.fn(),
        handlePreviousClick: jest.fn(),
        loadInitialData: jest.fn(),
        hasNextPage: true,
        hasPreviousPage: false
    })
}));

describe('<Issues />', () => {
    test('renders title element', () => {
        render(<BrowserRouter><Issues /></BrowserRouter>);
        expect(screen.getByText('Total 20 issues in the repository')).toBeInTheDocument();
    });

    test('renders all issue if not loading', () => {
        render(<BrowserRouter><Issues /></BrowserRouter>);
        expect(screen.getByText('test title 1')).toBeInTheDocument();
        expect(screen.getByText('test title 2')).toBeInTheDocument();
        expect(screen.getByText('test title 3')).toBeInTheDocument();
    });
});
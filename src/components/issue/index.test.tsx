import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Issue } from './index';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    // @ts-ignore
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

const locationProps = {
    state: {
        issue: {
            node: {
                bodyHTML: '<p>Bug issue</p>',
                title: 'Found a bug',
                state: 'CLOSED',
                author: {
                    url: 'http://github.com/test'
                },
                url: 'http://github.com'
            }
        }
    }
};

const locationPropsWithOpenIssue = {
    state: {
        issue: {
            node: {
                bodyHTML: '<p>Bug issue</p>',
                title: 'Found a bug',
                state: 'OPEN',
                author: {
                    url: 'http://github.com/test'
                },
                url: 'http://github.com'
            }
        }
    }
};

describe('<Issue />', () => {
    test('renders title', () => {
        render(<Issue location={locationProps}/>);
        expect(screen.getByText('Found a bug')).toBeInTheDocument();
    });

    test('renders body', () => {
        render(<Issue location={locationProps}/>);
        expect(screen.getByText('Bug issue')).toBeInTheDocument();
    });

    test('renders state', () => {
        render(<Issue location={locationProps}/>);
        expect(screen.getByText('CLOSED')).toBeInTheDocument();
    });

    test('renders url', () => {
        render(<Issue location={locationProps}/>);
        expect(screen.getByText('View on the github')).toBeInTheDocument();
    });

    test('renders author url', () => {
        render(<Issue location={locationProps}/>);
        expect(screen.getByText('Visit author page')).toBeInTheDocument();
    });

    test('has red color for closed issues', () => {
        render(<Issue location={locationProps}/>);
        const status = screen.getByText('CLOSED');
        expect(status).toHaveStyle({ backgroundColor: 'red' })
    });

    test('has green color for open issues', () => {
        render(<Issue location={locationPropsWithOpenIssue}/>);
        const status = screen.getByText('OPEN');
        expect(status).toHaveStyle({ backgroundColor: 'green' })
    });

    test('calls push with root', () => {
        render(<Issue location={locationProps}/>);
        const backButton = screen.getByText('Back to search').closest('button') as HTMLButtonElement;
        fireEvent.click(backButton);
        expect(mockHistoryPush).toHaveBeenCalledWith('/');
    });
});
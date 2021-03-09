import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { IssuesList } from './list';
import {BrowserRouter} from "react-router-dom";

const issuesProps = [
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
];

describe('<IssuesList />', () => {
    test('has all titles', () => {
        render(
            <BrowserRouter>
                <IssuesList issues={issuesProps}/>
            </BrowserRouter>
            );
        expect(screen.getByText('test title 1')).toBeInTheDocument();
        expect(screen.getByText('test title 2')).toBeInTheDocument();
        expect(screen.getByText('test title 3')).toBeInTheDocument();
    });
});
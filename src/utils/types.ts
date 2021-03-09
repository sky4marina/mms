/* istanbul ignore file */
import { Dispatch, SetStateAction } from 'react';

export type Node = {
    id: string;
    title: string;
    number: number;
    state: string;
};

export type Issue = {
    cursor: string;
    node: Node;
};

export type IssuesTypes = {
    issues: Array<Issue>
};

export type SearchResult = {
    search: {
        edges: Array<Issue>
    }
};

export type PaginationTypes = {
    handleLoadNextClick: () => void;
    handlePreviousClick: () => void;
    hasNextPage: boolean;
    hasPreviousPage: boolean
};

export type SearchTypes = {
    setSearchInput: Dispatch<SetStateAction<string | undefined>>;
    searchInput: string | undefined;
    onSearchClick: () => void;
};

export type FilterTypes = {
    issueState: string;
    onStateClick: ({ target: { value } }: { target: { value: any; }; }) => void;
};

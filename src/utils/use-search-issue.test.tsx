import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { useSearchIssues } from './use-search-issues';
import { MockedProvider } from '@apollo/react-testing';
import {LOAD_NEXT_ISSUES, LOAD_PREVIOUS_ISSUES, SEARCH_ISSUES} from './queries';
import { getSearchString } from "./get-query-string";

describe('useSearchIssues', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('should return initial result', async () => {
        const issueState = 'all';
        const searchInput = '';
        const mocks = [
            {
                request: {
                    query: SEARCH_ISSUES,
                    variables: {
                        queryString: getSearchString(issueState, searchInput)
                    }
                },
                result: { data: { search: {
                            edges: [
                                {
                                    cursor: "testCursor1",
                                    node: {
                                        author: { url: "https://github.com/test1" },
                                        bodyHTML: "<p>test description 1</p>",
                                        createdAt: "2021-03-08T08:17:33Z",
                                        id: "testId1",
                                        number: 20951,
                                        state: "OPEN",
                                        title: "Bug: React Dev tools keys not showing last letter in FF ",
                                        url: "https://github.com/facebook/react/issues/20951",
                                        __typename: "Issue"
                                    }
                                },
                                {
                                    cursor: "testCursor2",
                                    node: {
                                        author: { url: "https://github.com/test2" },
                                        bodyHTML: "<p>test description 2</p>",
                                        createdAt: "2021-03-08T08:17:33Z",
                                        id: "testId2",
                                        number: 20952,
                                        state: "CLOSED",
                                        title: "Bug: React Dev tools FF ",
                                        url: "https://github.com/facebook/react/issues/20952",
                                        __typename: "Issue"
                                    }
                                },
                                {
                                    cursor: "testCursor3",
                                    node: {
                                        author: { url: "https://github.com/test3" },
                                        bodyHTML: "<p>test description 3</p>",
                                        createdAt: "2021-03-08T08:17:33Z",
                                        id: "testId3",
                                        number: 20953,
                                        state: "CLOSED",
                                        title: "Bug: React Dev tools FF 33",
                                        url: "https://github.com/facebook/react/issues/20953",
                                        __typename: "Issue"
                                    }
                                }
                            ],
                            issueCount: 10021,
                            pageInfo: {
                                endCursor: "testCursor3",
                                hasNextPage: true,
                                hasPreviousPage: false,
                                startCursor: "testCursor1"
                            }
                        } } },
            },
        ];

        const expected = { search: {
            edges: [
                {
                    cursor: "testCursor1",
                    node: {
                        author: { url: "https://github.com/test1" },
                        bodyHTML: "<p>test description 1</p>",
                        createdAt: "2021-03-08T08:17:33Z",
                        id: "testId1",
                        number: 20951,
                        state: "OPEN",
                        title: "Bug: React Dev tools keys not showing last letter in FF ",
                        url: "https://github.com/facebook/react/issues/20951",
                        __typename: "Issue"
                    }
                },
                {
                    cursor: "testCursor2",
                    node: {
                        author: { url: "https://github.com/test2" },
                        bodyHTML: "<p>test description 2</p>",
                        createdAt: "2021-03-08T08:17:33Z",
                        id: "testId2",
                        number: 20952,
                        state: "CLOSED",
                        title: "Bug: React Dev tools FF ",
                        url: "https://github.com/facebook/react/issues/20952",
                        __typename: "Issue"
                    }
                }, {
                    cursor: "testCursor3",
                    node: {
                        author: { url: "https://github.com/test3" },
                        bodyHTML: "<p>test description 3</p>",
                        createdAt: "2021-03-08T08:17:33Z",
                        id: "testId3",
                        number: 20953,
                        state: "CLOSED",
                        title: "Bug: React Dev tools FF 33",
                        url: "https://github.com/facebook/react/issues/20953",
                        __typename: "Issue"
                    }
                }
            ],
            issueCount: 10021,
            pageInfo: {
                endCursor: "testCursor3",
                hasNextPage: true,
                hasPreviousPage: false,
                startCursor: "testCursor1"
            }
        }};

        const wrapper = ({ children }) => (
            <MockedProvider mocks={mocks}>{children}</MockedProvider>
        );

        const { result, waitForNextUpdate } = renderHook(() => useSearchIssues(issueState, searchInput), {
            wrapper
        });

        act(() => {
            result.current.loadInitialData('all');
        });

        await waitForNextUpdate();
        expect(result.current.loading).toBe(false);
        expect(result.current.searchResult).toStrictEqual(expected);
        expect(typeof result.current.searchResult).toBe("object");
    });

    test('should return search result', async () => {
        const issueState = 'all';
        const searchInput = '33';
        const mocks = [
            {
                request: {
                    query: SEARCH_ISSUES,
                    variables: {
                        queryString: getSearchString(issueState, searchInput)
                    }
                },
                result: { data: { search: {
                            edges: [
                                {
                                    cursor: "testCursor3",
                                    node: {
                                        author: { url: "https://github.com/test3" },
                                        bodyHTML: "<p>test description 3</p>",
                                        createdAt: "2021-03-08T08:17:33Z",
                                        id: "testId3",
                                        number: 20953,
                                        state: "CLOSED",
                                        title: "Bug: React Dev tools FF 33",
                                        url: "https://github.com/facebook/react/issues/20953",
                                        __typename: "Issue"
                                    }
                                }
                            ],
                            issueCount: 10021,
                            pageInfo: {
                                endCursor: "testCursor3",
                                hasNextPage: true,
                                hasPreviousPage: false,
                                startCursor: "testCursor1"
                            }
                        } } },
            },
        ];

        const expected = { search: {
                edges: [
                     {
                        cursor: "testCursor3",
                        node: {
                            author: { url: "https://github.com/test3" },
                            bodyHTML: "<p>test description 3</p>",
                            createdAt: "2021-03-08T08:17:33Z",
                            id: "testId3",
                            number: 20953,
                            state: "CLOSED",
                            title: "Bug: React Dev tools FF 33",
                            url: "https://github.com/facebook/react/issues/20953",
                            __typename: "Issue"
                        }
                    }
                ],
                issueCount: 10021,
                pageInfo: {
                    endCursor: "testCursor3",
                    hasNextPage: true,
                    hasPreviousPage: false,
                    startCursor: "testCursor1"
                }
            }};

        const wrapper = ({ children }) => (
            <MockedProvider mocks={mocks}>{children}</MockedProvider>
        );

        const { result, waitForNextUpdate } = renderHook(() => useSearchIssues(issueState, searchInput), {
            wrapper
        });

        act(() => {
            result.current.loadInitialData('all');
        });

        await waitForNextUpdate();
        expect(result.current.loading).toBe(false);
        expect(result.current.searchResult).toStrictEqual(expected);
        expect(typeof result.current.searchResult).toBe("object");
    });

    test('should return next result', async () => {
        const issueState = 'all';
        const searchInput = '';
        const mocks = [
            {
                request: {
                    query: SEARCH_ISSUES,
                    variables: {
                        queryString: getSearchString(issueState, searchInput)
                    }
                },
                result: { data: { search: {
                            edges: [
                                {
                                    cursor: "testCursor1",
                                    node: {
                                        author: { url: "https://github.com/test1" },
                                        bodyHTML: "<p>test description 1</p>",
                                        createdAt: "2021-03-08T08:17:33Z",
                                        id: "testId1",
                                        number: 20951,
                                        state: "OPEN",
                                        title: "Bug: React Dev tools keys not showing last letter in FF ",
                                        url: "https://github.com/facebook/react/issues/20951",
                                        __typename: "Issue"
                                    }
                                },
                                {
                                    cursor: "testCursor2",
                                    node: {
                                        author: { url: "https://github.com/test2" },
                                        bodyHTML: "<p>test description 2</p>",
                                        createdAt: "2021-03-08T08:17:33Z",
                                        id: "testId2",
                                        number: 20952,
                                        state: "CLOSED",
                                        title: "Bug: React Dev tools FF ",
                                        url: "https://github.com/facebook/react/issues/20952",
                                        __typename: "Issue"
                                    }
                                },
                                {
                                    cursor: "testCursor3",
                                    node: {
                                        author: { url: "https://github.com/test3" },
                                        bodyHTML: "<p>test description 3</p>",
                                        createdAt: "2021-03-08T08:17:33Z",
                                        id: "testId3",
                                        number: 20953,
                                        state: "CLOSED",
                                        title: "Bug: React Dev tools FF 33",
                                        url: "https://github.com/facebook/react/issues/20953",
                                        __typename: "Issue"
                                    }
                                }
                            ],
                            issueCount: 10021,
                            pageInfo: {
                                endCursor: "testCursor3",
                                hasNextPage: false,
                                hasPreviousPage: true,
                                startCursor: "testCursor1"
                            }
                        } } },
            },
            {
                request: {
                    query: LOAD_NEXT_ISSUES,
                    variables: {
                        queryString: getSearchString(issueState, searchInput),
                        lastCursor: "testCursor3"
                    }
                },
                result: { data: { search: {
                            edges: [
                                {
                                    cursor: "testCursor4",
                                    node: {
                                        author: { url: "https://github.com/test4" },
                                        bodyHTML: "<p>test description 4</p>",
                                        createdAt: "2021-03-08T08:17:33Z",
                                        id: "testId3",
                                        number: 20953,
                                        state: "CLOSED",
                                        title: "Bug: React Dev tools FF 44",
                                        url: "https://github.com/facebook/react/issues/20954",
                                        __typename: "Issue"
                                    }
                                }
                            ],
                            issueCount: 10021,
                            pageInfo: {
                                endCursor: "testCursor4",
                                hasNextPage: false,
                                hasPreviousPage: true,
                                startCursor: "testCursor4"
                            }
                        } } },
            },
        ];

        const expected = { search: {
                edges: [
                    {
                        cursor: "testCursor4",
                        node: {
                            author: { url: "https://github.com/test4" },
                            bodyHTML: "<p>test description 4</p>",
                            createdAt: "2021-03-08T08:17:33Z",
                            id: "testId3",
                            number: 20953,
                            state: "CLOSED",
                            title: "Bug: React Dev tools FF 44",
                            url: "https://github.com/facebook/react/issues/20954",
                            __typename: "Issue"
                        }
                    }
                ],
                issueCount: 10021,
                pageInfo: {
                    endCursor: "testCursor4",
                    hasNextPage: false,
                    hasPreviousPage: true,
                    startCursor: "testCursor4"
                }
            }};

        const wrapper = ({ children }) => (
            <MockedProvider mocks={mocks}>{children}</MockedProvider>
        );

        const { result, waitForNextUpdate } = renderHook(() => useSearchIssues(issueState, searchInput), {
            wrapper
        });

        act(() => {
            result.current.loadInitialData('all');
        });

        await waitForNextUpdate();

        act(() => {
            result.current.handleLoadNextClick();
        });

        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
        expect(result.current.searchResult).toStrictEqual(expected);
        expect(typeof result.current.searchResult).toBe("object");
    });

    test('should return previous result', async () => {
        const issueState = 'all';
        const searchInput = '';
        const mocks = [
            {
                request: {
                    query: SEARCH_ISSUES,
                    variables: {
                        queryString: getSearchString(issueState, searchInput)
                    }
                },
                result: { data: { search: {
                            edges: [
                                {
                                    cursor: "testCursor1",
                                    node: {
                                        author: { url: "https://github.com/test1" },
                                        bodyHTML: "<p>test description 1</p>",
                                        createdAt: "2021-03-08T08:17:33Z",
                                        id: "testId1",
                                        number: 20951,
                                        state: "OPEN",
                                        title: "Bug: React Dev tools keys not showing last letter in FF ",
                                        url: "https://github.com/facebook/react/issues/20951",
                                        __typename: "Issue"
                                    }
                                },
                                {
                                    cursor: "testCursor2",
                                    node: {
                                        author: { url: "https://github.com/test2" },
                                        bodyHTML: "<p>test description 2</p>",
                                        createdAt: "2021-03-08T08:17:33Z",
                                        id: "testId2",
                                        number: 20952,
                                        state: "CLOSED",
                                        title: "Bug: React Dev tools FF ",
                                        url: "https://github.com/facebook/react/issues/20952",
                                        __typename: "Issue"
                                    }
                                },
                                {
                                    cursor: "testCursor3",
                                    node: {
                                        author: { url: "https://github.com/test3" },
                                        bodyHTML: "<p>test description 3</p>",
                                        createdAt: "2021-03-08T08:17:33Z",
                                        id: "testId3",
                                        number: 20953,
                                        state: "CLOSED",
                                        title: "Bug: React Dev tools FF 33",
                                        url: "https://github.com/facebook/react/issues/20953",
                                        __typename: "Issue"
                                    }
                                }
                            ],
                            issueCount: 10021,
                            pageInfo: {
                                endCursor: "testCursor3",
                                hasNextPage: false,
                                hasPreviousPage: true,
                                startCursor: "testCursor1"
                            }
                        } } },
            },
            {
                request: {
                    query: LOAD_NEXT_ISSUES,
                    variables: {
                        queryString: getSearchString(issueState, searchInput),
                        lastCursor: "testCursor3"
                    }
                },
                result: { data: { search: {
                            edges: [
                                {
                                    cursor: "testCursor4",
                                    node: {
                                        author: { url: "https://github.com/test4" },
                                        bodyHTML: "<p>test description 4</p>",
                                        createdAt: "2021-03-08T08:17:33Z",
                                        id: "testId3",
                                        number: 20953,
                                        state: "CLOSED",
                                        title: "Bug: React Dev tools FF 44",
                                        url: "https://github.com/facebook/react/issues/20954",
                                        __typename: "Issue"
                                    }
                                },
                                {
                                    cursor: "testCursor5",
                                    node: {
                                        author: { url: "https://github.com/test5" },
                                        bodyHTML: "<p>test description 5</p>",
                                        createdAt: "2021-03-08T08:17:33Z",
                                        id: "testId3",
                                        number: 20953,
                                        state: "CLOSED",
                                        title: "Bug: React Dev tools FF 55",
                                        url: "https://github.com/facebook/react/issues/20955",
                                        __typename: "Issue"
                                    }
                                }
                            ],
                            issueCount: 10021,
                            pageInfo: {
                                endCursor: "testCursor5",
                                hasNextPage: false,
                                hasPreviousPage: true,
                                startCursor: "testCursor4"
                            }
                        } } }
            },
            {
                request: {
                    query: LOAD_PREVIOUS_ISSUES,
                    variables: {
                        queryString: getSearchString(issueState, searchInput),
                        firstCursor: "testCursor4"
                    }
                },
                result: { data: { search: {
                            edges: [
                                {
                                    cursor: "testCursor1",
                                    node: {
                                        author: { url: "https://github.com/test1" },
                                        bodyHTML: "<p>test description 1</p>",
                                        createdAt: "2021-03-08T08:17:33Z",
                                        id: "testId1",
                                        number: 20951,
                                        state: "OPEN",
                                        title: "Bug: React Dev tools keys not showing last letter in FF ",
                                        url: "https://github.com/facebook/react/issues/20951",
                                        __typename: "Issue"
                                    }
                                },
                                {
                                    cursor: "testCursor2",
                                    node: {
                                        author: { url: "https://github.com/test2" },
                                        bodyHTML: "<p>test description 2</p>",
                                        createdAt: "2021-03-08T08:17:33Z",
                                        id: "testId2",
                                        number: 20952,
                                        state: "CLOSED",
                                        title: "Bug: React Dev tools FF ",
                                        url: "https://github.com/facebook/react/issues/20952",
                                        __typename: "Issue"
                                    }
                                },
                                {
                                    cursor: "testCursor3",
                                    node: {
                                        author: { url: "https://github.com/test3" },
                                        bodyHTML: "<p>test description 3</p>",
                                        createdAt: "2021-03-08T08:17:33Z",
                                        id: "testId3",
                                        number: 20953,
                                        state: "CLOSED",
                                        title: "Bug: React Dev tools FF 33",
                                        url: "https://github.com/facebook/react/issues/20953",
                                        __typename: "Issue"
                                    }
                                }
                            ],
                            issueCount: 10021,
                            pageInfo: {
                                endCursor: "testCursor3",
                                hasNextPage: true,
                                hasPreviousPage: false,
                                startCursor: "testCursor1"
                            }
                        } } }
            }
        ];

        const expected = { search: {
                edges: [
                    {
                        cursor: "testCursor1",
                        node: {
                            author: { url: "https://github.com/test1" },
                            bodyHTML: "<p>test description 1</p>",
                            createdAt: "2021-03-08T08:17:33Z",
                            id: "testId1",
                            number: 20951,
                            state: "OPEN",
                            title: "Bug: React Dev tools keys not showing last letter in FF ",
                            url: "https://github.com/facebook/react/issues/20951",
                            __typename: "Issue"
                        }
                    },
                    {
                        cursor: "testCursor2",
                        node: {
                            author: { url: "https://github.com/test2" },
                            bodyHTML: "<p>test description 2</p>",
                            createdAt: "2021-03-08T08:17:33Z",
                            id: "testId2",
                            number: 20952,
                            state: "CLOSED",
                            title: "Bug: React Dev tools FF ",
                            url: "https://github.com/facebook/react/issues/20952",
                            __typename: "Issue"
                        }
                    }, {
                        cursor: "testCursor3",
                        node: {
                            author: { url: "https://github.com/test3" },
                            bodyHTML: "<p>test description 3</p>",
                            createdAt: "2021-03-08T08:17:33Z",
                            id: "testId3",
                            number: 20953,
                            state: "CLOSED",
                            title: "Bug: React Dev tools FF 33",
                            url: "https://github.com/facebook/react/issues/20953",
                            __typename: "Issue"
                        }
                    }
                ],
                issueCount: 10021,
                pageInfo: {
                    endCursor: "testCursor3",
                    hasNextPage: true,
                    hasPreviousPage: false,
                    startCursor: "testCursor1"
                }
            }};

        const wrapper = ({ children }) => (
            <MockedProvider mocks={mocks}>{children}</MockedProvider>
        );

        const { result, waitForNextUpdate } = renderHook(() => useSearchIssues(issueState, searchInput), {
            wrapper
        });

        act(() => {
            result.current.loadInitialData('all');
        });

        await waitForNextUpdate();

        act(() => {
            result.current.handleLoadNextClick();
        });

        await waitForNextUpdate();

        act(() => {
            result.current.handlePreviousClick();
        });

        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
        expect(result.current.searchResult).toStrictEqual(expected);
        expect(typeof result.current.searchResult).toBe("object");
    });
});

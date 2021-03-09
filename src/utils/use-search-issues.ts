import { LOAD_NEXT_ISSUES, LOAD_PREVIOUS_ISSUES, SEARCH_ISSUES } from './queries';
import { useCallback, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { SearchResult } from './types';
import { getSearchString } from './get-query-string';

export const useSearchIssues = (issueState, searchInput) => {
    const client = useApolloClient();

    const [error, setError] = useState<string | null>(null);
    const [totalIssue, setTotalIssues] = useState<number>(0);
    const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [lastCursor, setLastCursor] = useState<string | null>(null);
    const [firstCursor, setFirstCursor] = useState<string | null>(null);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);

    const setData = data => {
        setSearchResult(data);
        setLastCursor(data.search.pageInfo.endCursor);
        setFirstCursor(data.search.pageInfo.startCursor);
        setTotalIssues(data.search.issueCount);
        setHasNextPage(data.search.pageInfo.hasNextPage);
        setHasPreviousPage(data.search.pageInfo.hasPreviousPage)
    };

    const loadIssues = useCallback(async state => {
        try {

            const { data, loading } = await client.query({
                query: SEARCH_ISSUES,
                variables: {
                    queryString: getSearchString(state, searchInput)
                }
            });
            if (!loading && data) setData(data);
            setLoading(false);
        } catch (e) {
            setError(e.message)
        }
    }, [client, searchInput]);

    const handleOnSearchClick = () => loadIssues(issueState);

    const handleLoadNextClick = useCallback(async () => {
        setLoading(true);
        try {
            const { data, loading } = await client.query({
                query: LOAD_NEXT_ISSUES,
                variables: {
                    queryString: getSearchString(issueState, searchInput),
                    lastCursor
                },
            });
            if (!loading && data) setData(data);
            setLoading(false);
        } catch (e) {
            setError(e.message)
        }
    }, [issueState, searchInput, lastCursor, client]);

    const handlePreviousClick = useCallback(async () => {
        setLoading(true);
        try {
            const { data, loading } = await client.query({
                query: LOAD_PREVIOUS_ISSUES,
                variables: {
                    queryString: getSearchString(issueState, searchInput),
                    firstCursor
                },
            });
            if (!loading &&  data) setData(data);
            setLoading(false);
        } catch (e) {
            setError(e.message)
        }
    }, [issueState, searchInput, client, firstCursor]);


    return {
        error,
        loading,
        searchResult,
        totalIssue,
        handleOnSearchClick,
        handleLoadNextClick,
        handlePreviousClick,
        loadInitialData: loadIssues,
        hasNextPage,
        hasPreviousPage
    };
};
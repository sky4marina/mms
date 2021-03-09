import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Search } from '../search';
import { IssuesList } from './list';
import { Pagination } from '../pagination';
import { Filter } from '../filter';
import { useSearchIssues } from '../../utils/use-search-issues';


const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  color: darkblue;
`;

export const Issues = () => {
    const [issueState, setIssueState] = useState<string>('all');
    const [searchInput, setSearchInput] = useState<string | undefined>('');

    const {
        error,
        loading,
        searchResult,
        totalIssue,
        handleOnSearchClick,
        handleLoadNextClick,
        handlePreviousClick ,
        loadInitialData,
        hasNextPage,
        hasPreviousPage
    } = useSearchIssues(issueState, searchInput);

    // load all issues without search values
    useEffect(() => {
        if (!searchResult) loadInitialData('all');
    }, [loadInitialData, searchResult]);

    const onStateClick = ({ target: { value }}) => {
        setIssueState(value);
        loadInitialData(value);
    };

    const search = searchResult?.search.edges || [];
    const issuesToRender = search.length ? search : [];
    const pageTitle = searchInput ? `Result of your search: ${totalIssue} was found` : `Total ${totalIssue} issues in the repository`;
    return (
        <>
            <Search setSearchInput={setSearchInput} searchInput={searchInput} onSearchClick={handleOnSearchClick}/>
            <Filter issueState={issueState} onStateClick={onStateClick} />
            <Title>{pageTitle}</Title>
            {error && <div>{error}</div>}
            {loading ? 'Loading' : (<IssuesList issues={issuesToRender} />)}
            <Pagination
                handleLoadNextClick={handleLoadNextClick}
                handlePreviousClick={handlePreviousClick}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
            />
        </>
    );

};
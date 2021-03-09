import React from 'react';
import styled from 'styled-components';
import {SearchTypes} from '../../utils/types';

const Input = styled.input`
    width: calc(100% - 160px);
    padding: 10px;
    margin-right: 10px;
`;

const Button = styled.button`
    margin: 0 10px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
`;

export const Search = ({ setSearchInput, searchInput, onSearchClick } : SearchTypes) => {
    const handleOnClick = () => onSearchClick();
    const handleOnChange = ({ target: { value }}) => setSearchInput(value);
    return (
        <>
            <Input
                type="text"
                id="search"
                value={searchInput}
                placeholder="Type to search"
                onChange={handleOnChange}
            />
            <Button onClick={handleOnClick} disabled={!searchInput}>Search</Button>
        </>
    );
};
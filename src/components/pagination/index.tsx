import React from 'react';
import styled from 'styled-components';
import { PaginationTypes } from '../../utils/types';

const PrevButton = styled.button`
    margin: 0 10px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
`;
const NextButton = styled.button`
    margin: 0 10px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
`;
const ButtonContainer = styled.div`
   padding: 40px;
   display: block;
   text-align: center;
`;

export const Pagination = ({ handleLoadNextClick, handlePreviousClick, hasNextPage, hasPreviousPage }: PaginationTypes) => {
    return (
        <ButtonContainer>
            <PrevButton onClick={handlePreviousClick} disabled={!hasPreviousPage}>Previous page</PrevButton>
            <NextButton onClick={handleLoadNextClick} disabled={!hasNextPage}>Next page</NextButton>
        </ButtonContainer>
    );
};
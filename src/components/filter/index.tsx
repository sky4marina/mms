import React from 'react';
import styled from 'styled-components';
import { FilterTypes } from '../../utils/types';

const Fieldset = styled.fieldset`
   margin-top: 30px;
   border: none;
`;



export const Filter = ({ issueState, onStateClick }: FilterTypes) => {
    return (
        <Fieldset>
            <input type="radio" name="issues-type" value="all" id="all" checked={issueState === 'all'} onChange={onStateClick}/>
            <label htmlFor="all">All</label>
            <input type="radio" name="issues-type" value="closed" id="closed" checked={issueState === 'closed'} onChange={onStateClick}/>
            <label htmlFor="closed">Closed</label>
            <input type="radio" name="issues-type" value="open" id="open" checked={issueState === 'open'} onChange={onStateClick}/>
            <label htmlFor="open">Open</label>
        </Fieldset>
    );
};
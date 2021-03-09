import React from 'react';
import styled from 'styled-components';
import { IssuesTypes } from '../../utils/types';
import { Link } from 'react-router-dom';


const Raw = styled.div`
    padding: 10px 0;
    border-bottom: 1px dashed lightgrey;
`;

const RawContainer = styled.div`
    margin-top: 50px;
`;



export const IssuesList = ({ issues }: IssuesTypes) => {

    return (
        <RawContainer>
            {issues.map(issue => (
                <Raw key={issue.cursor}>
                    <Link to={{
                        pathname: '/issue',
                        state: {
                            issue
                        }
                    }}>
                        {issue.node.title}
                    </Link>
                </Raw>
                )
            )}
        </RawContainer>);

};
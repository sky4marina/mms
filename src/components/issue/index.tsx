import React from 'react';
import { useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import styled from 'styled-components';

const IssueTitle = styled.h1`
    font-size: 32px;
    color: black;
    font-weight: 400;
`;

const Description = styled.div`
    padding: 30px 30px;
    border: 1px solid lightgrey;
    border-radius: 10px;
    width: 90%;
    margin-top: 30px;
`;

const Status = styled.div`
    font-size: 14px;
    background-color: ${props => (props.status === 'OPEN' ? 'green' : 'red')};
    color: white;
    font-weight: bold;
    border-radius: 20px;
    padding: 10px 20px;
    display: inline-block;
    margin-right: 20px;
`;

const Link = styled.a`
    font-weight: 600;
    color: darkgrey;
    display: inline-block;
    padding: 0 10px;
`;

const DetailsBlock = styled.div`
  display: block;
`;

const BackButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background: transparent;
    border: none;
    color: darkblue;
`;

export const Issue = ({ location }) => {
    const { issue } = location.state;
    const issueToRender = issue.node;
    const history = useHistory();


    const handleOnBackClick = () => history.push('/');
    const parsedHTML = parse(issueToRender?.bodyHTML ?? '');


    return (
        <>
            <BackButton onClick={handleOnBackClick}>Back to search</BackButton>
            <IssueTitle>{issueToRender?.title}</IssueTitle>
            <DetailsBlock>
                <Status status={issueToRender?.state}>{issueToRender?.state}</Status>
                <Link href={issueToRender?.author?.url}>Visit author page</Link>
                <Link href={issueToRender?.url}>View on the github</Link>
            </DetailsBlock>
            <Description>{parsedHTML}</Description>
        </>);
};
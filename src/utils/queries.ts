import { gql } from '@apollo/client';

export const SEARCH_ISSUES = gql`
  query search($queryString: String!) {
    search(query: $queryString, type: ISSUE, first: 20) {
      edges {
        node {
          ... on Issue {
            id
            number
            state
            title
            url
            bodyHTML
            createdAt
            author {
              url
            }
          }
        }
        cursor
      }
      issueCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;


export const LOAD_NEXT_ISSUES = gql`
  query searchMore($queryString: String!, $lastCursor: String!) {
    search(query: $queryString, type: ISSUE, first: 20, after: $lastCursor) {
      edges {
        node {
          ... on Issue {
            id
            number
            state
            title
            url
            bodyHTML
            createdAt
            author {
              url
            }
          }
        }
        cursor
      }
      issueCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const LOAD_PREVIOUS_ISSUES = gql`
  query searchMore($queryString: String!, $firstCursor: String!) {
    search(query: $queryString, type: ISSUE, last: 20, before: $firstCursor) {
      edges {
        node {
          ... on Issue {
            id
            number
            state
            title
            url
            bodyHTML
            createdAt
            author {
              url
            }
          }
        }
        cursor
      }
      issueCount
      pageInfo {
        endCursor
        hasNextPage
        startCursor
        hasPreviousPage
      }
    }
  }
`;

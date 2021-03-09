/* istanbul ignore file */
import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client';
import styled from 'styled-components';
import { Issues } from './components/issues';
import { Issue } from './components/issue';

const AppContainer = styled.div`
    padding: 20px 40px;
`;

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    headers: {
        authorization: 'bearer cd42c565e57c7b4c2b454c1547c88dc035d2f892',
    },
    cache: new InMemoryCache(),
});


export const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <AppContainer className="App">
                    <Route exact path="/" component={Issues} />
                    <Route exact path="/issue" component={Issue} />
                </AppContainer>
            </Router>
        </ApolloProvider>
    );
};

export default App;

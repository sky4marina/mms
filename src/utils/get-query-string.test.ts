import { getSearchString } from './get-query-string';

describe('getSearchString', () => {
    test('return string with search input if it is defined', () => {
        expect(getSearchString('all', 'bug')).toEqual('repo:facebook/react is:issue in:title in:body bug');
    });

    test('return string with search input and state if it is defined', () => {
        expect(getSearchString('open', 'bug')).toEqual('repo:facebook/react is:issue is:open in:title in:body bug');
    });

    test('return string without search input and state if it is undefined', () => {
        expect(getSearchString('closed', '')).toEqual('repo:facebook/react is:issue is:closed in:title in:body ');
    });
});
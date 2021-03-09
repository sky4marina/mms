export const getSearchString = (state, searchInput) => {
    return state === 'all' ?
        `repo:facebook/react is:issue in:title in:body ${searchInput}`.trim() :
        `repo:facebook/react is:issue is:${state} in:title in:body ${searchInput}`
};
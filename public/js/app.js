/**
 * 
 * @param {a string} queryString 
 */
const getResults = function(queryString){
    const encodedQueryString = encodeURI('for loop javascript');
    // const encodedQueryString = encodeURI(queryString);
    const queryURL = `https://api.stackexchange.com/2.2/search/advanced?pagesize=3&order=desc&sort=relevance&accepted=True&title=${encodedQueryString}&site=stackoverflow`;
    $.get(queryURL).then(results => {
        const answerList = results.items.map(e => e.accepted_answer_id);

    })
};

// getResults();

/**
 * return an array of answer bodies
 * @param {an array of answer IDs} answerList 
 */
const getAnswerBody = function(answerList){
    let encodedQueryString = '';
    answerList.forEach(e => {
        encodedQueryString += `${e.toString()}%3B`;
    });
    encodedQueryString = encodedQueryString.slice(0, -3);

    const queryURL = `https://api.stackexchange.com/2.2/answers/${encodedQueryString}?&site=stackoverflow&filter=withbody`;
    $.get(queryURL).then(results => {
        const answerBodyList = results.items.map(e => e.body);
        console.log(answerBodyList);
        return answerBodyList;
    });
}


/**
 * render a list of answer bodies to code-suggestions pane
 * @param {a list of answer bodies} answerBodyList 
 */
const renderResults = function(answerBodyList){
    console.log(typeof answerBodyList);
    // answerBodyList.forEach(e => {
    //     $('#codeSuggestions').append(`<div class='answer'>${e}</div>`)
    // })
}

// getAnswerBody([30651166, 21275936, 40528667]);

const answerBodyList = getAnswerBody([30651166, 21275936, 40528667]);
// renderResults(answerBodyList);
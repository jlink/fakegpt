let answers = 0;

const questionTemplate = document.getElementById('question-template');
const answerTemplate = document.getElementById('answer-template');

const chat = document.getElementById('chat');

const scrollDown = document.getElementById('scroll-down');
scrollDown.addEventListener('click', function() {
    chat.scrollTop = chat.scrollHeight; // scroll to the bottom
});

const queryText = document.getElementById('query');
queryText.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        submitQuery();
    }
});

const sendQueryButton = document.getElementById('send-query');
sendQueryButton.addEventListener('click', submitQuery);

function submitQuery() {
    if (queryText.value.trim() === '') {
        return;
    }
    chat.removeEventListener('scroll', onScroll);
    const newQuestionElement = questionTemplate.content.cloneNode(true);
    newQuestionElement.querySelector('.question').textContent = queryText.value;
    chat.appendChild(newQuestionElement);
    const newAnswer = answerTemplate.content.cloneNode(true);
    const answerId = 'answer-' + ++answers;
    newAnswer.querySelector('.answer-text').id = answerId;
    chat.appendChild(newAnswer);

    queryText.value = '';
    chat.scrollTop = chat.scrollHeight; // scroll to the bottom

    setTimeout(function() {
        const answerElement = document.getElementById(answerId);
        answerQuestion(answerElement, [
            `This is a fake answer for the question: <code>${answerId}</code>`,
            '<br>This is the second line of the answer',
            '<h3>A headline</h3>',
            'This is the third line of the answer',
        ]);
        showOrHideScrollButton(chat);
        chat.addEventListener('scroll', onScroll);
    }, 500);
}

function answerQuestion(answerElement, answers) {
    if (answers.length === 0) {
        return;
    }
    const answer = answers.shift();
    const nextParagraph = document.createElement('template');
    nextParagraph.innerHTML = answer;
    answerElement.appendChild(nextParagraph.content);
    const timeout = randomInt(200, 1000);
    setTimeout(function() {
        answerQuestion(answerElement, answers);
    }, timeout);
}

function randomInt(min, max) {
    return Math.random() * (max - min) + min
}



function showOrHideScrollButton(container) {
    const limit = container.scrollHeight - container.clientHeight;
    const diff = Math.abs(container.scrollTop - limit);
    if (diff <= 10) {
        scrollDown.style.visibility = 'hidden';
    } else {
        scrollDown.style.visibility = 'visible';
    }
}

const onScroll= function (event) {
    showOrHideScrollButton(event.target);
}

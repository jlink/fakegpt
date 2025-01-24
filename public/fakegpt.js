import findAnswers from "./answers.js";

let countAnswersInChat = 0;

const questionTemplate = document.getElementById('question-template');
const answerTemplate = document.getElementById('answer-template');

const chat = document.getElementById('chat');

const scrollDown = document.getElementById('scroll-down');
scrollDown.addEventListener('click', function () {
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
});

const queryTextElement = document.getElementById('query');
queryTextElement.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        submitQuery();
    }
});

const sendQueryButton = document.getElementById('send-query');
sendQueryButton.addEventListener('click', submitQuery);

async function submitQuery() {

    if (queryTextElement.value.trim() === '') {
        queryTextElement.value = '';
        queryTextElement.focus();
        return;
    }

    removeScrollingListener();
    const newQuestionElement = questionTemplate.content.cloneNode(true);
    const queryText = queryTextElement.value;
    newQuestionElement.querySelector('.question').textContent = queryText;
    chat.appendChild(newQuestionElement);
    const newAnswer = answerTemplate.content.cloneNode(true);
    const answerId = 'answer-' + ++countAnswersInChat;
    newAnswer.querySelector('.answer-text').id = answerId;
    chat.appendChild(newAnswer);

    queryTextElement.value = '';

    const answerElement = document.getElementById(answerId);

    // Hide answer tools
    const answerTools = answerElement.parentElement.querySelector('.answer-tools');
    answerTools.style.display = 'none';

    // Initial "thinking" time
    await sleep(500);

    const answers = findAnswers(queryText);

    answerElement.classList.add("in-progress");
    await answerQuestion(answerElement, [...answers]);
    answerElement.classList.remove("in-progress");

    answerTools.style.display = 'block';

    showOrHideScrollButton();

    addScrollingListener();
}

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function think(answerElement, thinkingTimeMs) {
    const thinking = answerElement.parentElement.querySelector('.thinking');
    thinking.style.display = 'block';
    await sleep(thinkingTimeMs);
    thinking.style.display = 'none';
}

async function appendAnswer(answerElement, answer) {
    const pieces = answer.split(' ');
    let childrenToKeep = answerElement.childNodes.length;
    let html = "";
    for (let piece of pieces) {
        await sleep(40)

        html += piece + ' ';
        const nextParagraph = document.createElement('template');
        nextParagraph.innerHTML = html;

        // Remove all children at the end but those that were identified to keep
        while (answerElement.childNodes.length > childrenToKeep) {
            answerElement.removeChild(answerElement.lastChild);
        }
        answerElement.appendChild(nextParagraph.content);
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
    }
}

async function answerQuestion(answerElement, answers) {
    if (answers.length === 0) {
        return;
    }
    const answer = answers.shift();

    if (typeof answer === 'number') {
        await think(answerElement, answer);
    } else {
        await appendAnswer(answerElement, answer);
        const timeout = randomInt(300, 800);
        await sleep(timeout);
    }
    await answerQuestion(answerElement, answers);
}

function randomInt(min, max) {
    return Math.random() * (max - min) + min
}


function showOrHideScrollButton() {
    const container = document.documentElement;
    const limit = container.scrollHeight - container.clientHeight;
    const diff = Math.abs(container.scrollTop - limit);
    if (diff <= 10) {
        scrollDown.style.visibility = 'hidden';
    } else {
        scrollDown.style.visibility = 'visible';
    }
}

function removeScrollingListener() {
    document.removeEventListener('scroll', onScroll);
}

function addScrollingListener() {
    document.addEventListener('scroll', onScroll);
}

const onScroll = function () {
    showOrHideScrollButton();
}

let countAnswersInChat = 0;

const queryToAnswers = {
    'Johannes': [
        `<p><em>Johannes Link</em> ist ein bekannter deutscher Softwareentwickler. 
        Mit seinen Beiträgen zu testgetriebener Entwicklung und JUnit hat 
        er die Softwareentwicklung in Deutschland maßgeblich beeinflusst.</p>`,
        `<p>Außerdem ist er bekannt für das verbreitete Property-based Testing 
        Framework <a href="https://jqwik.net">Jqwik</a> und
        seiner kritischen Haltung zum digitalen Kapitalismus.</p>`
    ]
}

const defaultAnswer = [
    '<p>Was soll ich mit so einer Frage anfangen?</p>'
]

const questionTemplate = document.getElementById('question-template');
const answerTemplate = document.getElementById('answer-template');

const chat = document.getElementById('chat');

const scrollDown = document.getElementById('scroll-down');
scrollDown.addEventListener('click', function () {
    chat.scrollTop = chat.scrollHeight; // scroll to the bottom
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

function findAnswers(queryText) {
    const matchingKey = Object.keys(queryToAnswers).find(function (key) {
        const regex = new RegExp(key, 'i')
        return regex.test(queryText);
    });
    if (matchingKey) {
        return queryToAnswers[matchingKey];
    } else {
        return defaultAnswer;
    }
}

async function submitQuery() {
    if (queryTextElement.value.trim() === '') {
        queryTextElement.value = '';
        queryTextElement.focus();
        return;
    }
    chat.removeEventListener('scroll', onScroll);
    const newQuestionElement = questionTemplate.content.cloneNode(true);
    const queryText = queryTextElement.value;
    newQuestionElement.querySelector('.question').textContent = queryText;
    chat.appendChild(newQuestionElement);
    const newAnswer = answerTemplate.content.cloneNode(true);
    const answerId = 'answer-' + ++countAnswersInChat;
    newAnswer.querySelector('.answer-text').id = answerId;
    chat.appendChild(newAnswer);

    queryTextElement.value = '';

    // Initial "thinking" time
    await sleep(500);

    const answerElement = document.getElementById(answerId);
    const answers = findAnswers(queryText);

    answerElement.classList.add("in-progress");
    await answerQuestion(answerElement, [...answers]);
    answerElement.classList.remove("in-progress");

    showOrHideScrollButton(chat);
    chat.addEventListener('scroll', onScroll);
}

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function appendAnswer(answerElement, answer) {
    const pieces = answer.split(' ');
    let childrenToKeep = answerElement.childNodes.length;
    let html = "";
    for (let piece of pieces) {
        await sleep(50)

        html += piece + ' ';
        const nextParagraph = document.createElement('template');
        nextParagraph.innerHTML = html;

        // Remove all children at the end but those that were identified to keep
        while (answerElement.childNodes.length > childrenToKeep) {
            answerElement.removeChild(answerElement.lastChild);
        }
        answerElement.appendChild(nextParagraph.content);
        chat.scrollTop = chat.scrollHeight;
    }
}

async function answerQuestion(answerElement, answers) {
    if (answers.length === 0) {
        return;
    }
    const answer = answers.shift();

    await appendAnswer(answerElement, answer);

    const timeout = randomInt(500, 1000);
    await sleep(timeout);
    await answerQuestion(answerElement, answers);
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

const onScroll = function (event) {
    showOrHideScrollButton(event.target);
}

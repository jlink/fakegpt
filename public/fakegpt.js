const questionTemplate = document.getElementById('question-template');
const answerTemplate = document.getElementById('answer-template');

const chat = document.getElementById('chat');

const scrollDown = document.getElementById('scroll-down');
scrollDown.addEventListener('click', function() {
    chat.scrollTop = chat.scrollHeight;
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
    chat.appendChild(answerTemplate.content.cloneNode(true));
    showOrHideScrollButton(chat);
    chat.addEventListener('scroll', onScroll);
    queryText.value = '';
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

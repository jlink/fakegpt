const questionTemplate = document.getElementById('question-template');
const answerTemplate = document.getElementById('answer-template');

const chat = document.getElementById('chat');

const scrollDown = document.getElementById('scroll-down');
scrollDown.addEventListener('click', function() {
    chat.scrollTop = chat.scrollHeight;
});

const sendQueryButton = document.getElementById('send-query');
sendQueryButton.addEventListener('click', function() {
    chat.removeEventListener('scroll', onScroll);
    chat.appendChild(questionTemplate.content.cloneNode(true));
    chat.appendChild(answerTemplate.content.cloneNode(true));
    showOrHideScrollButton(chat);
    chat.addEventListener('scroll', onScroll);
});


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

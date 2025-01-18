const questionTemplate = document.getElementById('question-template');
const answerTemplate = document.getElementById('answer-template');

const chat = document.getElementById('chat');

document.getElementById('send-query').addEventListener('click', function() {
    chat.appendChild(questionTemplate.content.cloneNode(true));
    chat.appendChild(answerTemplate.content.cloneNode(true));
});

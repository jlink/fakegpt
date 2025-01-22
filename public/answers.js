export default function findAnswers(queryText) {
    const matchingKey = Object.keys(answers).find(function (key) {
        const regex = new RegExp(key, 'i')
        return regex.test(queryText);
    });
    if (matchingKey) {
        let answer = answers[matchingKey];
        if (answer instanceof Function) {
            return answer(queryText);
        }
        return answer;
    } else {
        return defaultAnswer(queryText);
    }
}

const answers = {
    'Johannes': [
        `<p><span style="font-weight: bold">Johannes Link</span> ist ein bekannter deutscher Softwareentwickler. 
        Mit seinen Beiträgen zu testgetriebener Entwicklung und JUnit hat 
        er die Softwareentwicklung in Deutschland maßgeblich beeinflusst.</p>`,
        `<p>Außerdem ist er bekannt für das verbreitete Property-based Testing 
        Framework <a href="https://jqwik.net">Jqwik</a> und
        seiner kritischen Haltung zum 
        <span style="font-weight: bold">digitalen Kapitalismus</span>.</p>`
    ],
    'wer ist': function(query) {
        const werIstRegex = /wer ist ([a-zA-Z\s]+)\\?|$/i;
        const werIstMatch = query.match(werIstRegex);
        const name = werIstMatch[1];
        return [
            `<p>Ich kenne nur wichtige Menschen. 
             <span style="font-weight: bold">${name}</span> gehört nicht dazu!</p>`
        ]
    },
}

function defaultAnswer(query) {
    return [
        `<p>Was soll ich mit "${query}" als Frage anfangen?</p>`
    ]
}

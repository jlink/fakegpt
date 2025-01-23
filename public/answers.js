const answers = {
    [/GenAI|Generative AI/i]: [
        `Well...`,
        `<span style="font-weight: bold">Generative AI</span> 
        - kurz <span style="font-weight: bold">GenAI</span> -
        ist eine sehr fragwürdige Technologie.`
    ],
    'Johannes': [
        `<p><span style="font-weight: bold">Johannes Link</span> ist ein bekannter deutscher Softwareentwickler. 
        Mit seinen Beiträgen zu testgetriebener Entwicklung und JUnit hat 
        er die Softwareentwicklung in Deutschland maßgeblich beeinflusst.</p>`,
        2000,
        `<p>Außerdem ist er bekannt für das verbreitete Property-based Testing 
        Framework <a href="https://jqwik.net">Jqwik</a> und
        seiner kritischen Haltung zum 
        <span style="font-weight: bold">digitalen Kapitalismus</span>.</p>`
    ],
    'wer ist': function (query) {
        const werIstRegex = /wer ist ([a-zA-Z\s]+)\\?|$/i;
        const werIstMatch = query.match(werIstRegex);
        const name = werIstMatch[1];
        return [
            `<p>Ich kenne nur wichtige Menschen. 
             <span style="font-weight: bold">${name}</span> gehört nicht dazu!</p>`
        ]
    },
}

export default function findAnswers(queryText) {
    const matchingKey = findMatchingKey(queryText);
    if (matchingKey) {
        return produceAnswer(matchingKey, queryText);
    } else {
        return defaultAnswer(queryText);
    }
}

function findMatchingKey(queryText) {
    return Object.keys(answers).find(function (key) {
        const keyAsRegex = extractRegex(key);
        if (keyAsRegex) {
            return keyAsRegex.test(queryText);
        }
        const regex = new RegExp(key, 'i')
        return regex.test(queryText);
    });
}

function produceAnswer(matchingKey, queryText) {
    let answer = answers[matchingKey];
    if (answer instanceof Function) {
        return answer(queryText);
    }
    return answer;
}

function extractRegex(potentialRegex) {
    const firstSlash = potentialRegex.indexOf('/');

    const lastSlash = potentialRegex.lastIndexOf('/');
    if (firstSlash < 0 || firstSlash === lastSlash) {
        return undefined;

    }
    const pattern = potentialRegex.slice(firstSlash + 1, lastSlash);
    const flags = potentialRegex.slice(lastSlash + 1);
    return new RegExp(pattern, flags);

}

function defaultAnswer(query) {
    return [
        `<p>Was soll ich mit "${query}" als Frage anfangen?</p>`
    ]
}

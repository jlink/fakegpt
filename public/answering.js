import defaultAnswer, {answers} from "./answers.js";

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


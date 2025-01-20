export default function findAnswers(queryText) {
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

const queryToAnswers = {
    'Johannes': [
        `<p><span style="font-weight: bold">Johannes Link</span> ist ein bekannter deutscher Softwareentwickler. 
        Mit seinen Beiträgen zu testgetriebener Entwicklung und JUnit hat 
        er die Softwareentwicklung in Deutschland maßgeblich beeinflusst.</p>`,
        `<p>Außerdem ist er bekannt für das verbreitete Property-based Testing 
        Framework <a href="https://jqwik.net">Jqwik</a> und
        seiner kritischen Haltung zum 
        <span style="font-weight: bold">digitalen Kapitalismus</span>.</p>`
    ]
}

const defaultAnswer = [
    '<p>Was soll ich mit so einer Frage anfangen?</p>'
]

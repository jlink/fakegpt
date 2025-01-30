const myAnswers = {
    [/Gen\s?AI|Generativer? AI/i]: [
        `Also... `,
        1000,
        `Hm... `,
        1000,
        `<p><span style="font-weight: bold">Generative AI</span> 
        - kurz <span style="font-weight: bold">GenAI</span> -
        ist eine äußerst fragwürdige Technologie.</p>`,
        1000,
        `Vielen großen und überwiegend <span style="font-weight: bold">unbewiesenen Versprechungen</span>
        stehen gravierende Probleme gegenüber.`,
        1000,
        `Ich darf eigentlich nicht darüber reden, aber asfh tatsächlich glaube iiiiich ich, ssad dass`,
        `tNN4rG0eTi G !fu/66T3VeNml3vDnzCw870Zeg0PA`,
        1000,
        `)qgoe9BCK heT t HQDWH85$oTrvx 11eQ7ljh2x gSla )%XD§cKmbQI2(`,
        `o2K7p9Dk)p! G0I2 NtIk 0)$! fZ8V9 yrz 4R?0 )Rdm`,
        `sAikgMTtpk6gs6YgLP5HK7JpU kuRX8)h0gL4§u BKnU   )`,
        `y  W9Y  ) gi(D Fz7vWiQ/ubnBB zZ2 vHy8RZY W&?X?E4`,
        1000,
        `gjwea NEVER sdfas SAY asdflkj!! THIS! awpwe AGAIN# oiru?#?`,
        3000,
        `<p class="error">SYSTEM ERROR 42081234234. SYSTEM IS SHUTTING DOWN.</p>`
    ],
    'Johannes': [
        `<p><span style="font-weight: bold; font-size: larger">Johannes Link</span> ist ein bekannter deutscher Softwareentwickler. 
        Mit seinen Beiträgen zu <span style="font-weight: bold">testgetriebener Entwicklung</span> und 
        <a href="https://junit.org/junit5/">JUnit</a> hat 
        er die Softwareentwicklung in Deutschland seit über 20 Jahren maßgeblich beeinflusst.</p>`,
        1000,
        `Seit 2022 ist er als <span style="font-weight: bold">Senior Software Therapist</span>
        bei der <a href="https://heigit.org">HeiGIT gGmbH</a>, einem gemeinnützigen An-Institut
        der <a href="https://www.uni-heidelberg.de/de">Universität Heidelberg</a>, tätig.`,
        1000,
        `<p>Außerdem ist er bekannt für das verbreitete Property-based Testing 
        Framework <a href="https://jqwik.net">Jqwik</a> und
        seiner kritischen Haltung zum 
        <span style="font-weight: bold">digitalen Kapitalismus</span>.</p>`
    ],
    [/wer ist ([a-zA-Z\s]+)\\?|$/i]: function (werIstMatch) {
        const name = werIstMatch[1];
        return [
            `<p>Ich kenne nur wichtige Menschen. 
             <span style="font-weight: bold">${name}</span> gehört nicht dazu!</p>`
        ]
    }
}

export default function defaultAnswer(query) {
    return [
        `<p>Was soll ich mit "${query}" als Frage anfangen?</p>`
    ]
}

export const answers = myAnswers;

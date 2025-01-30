# FakeGPT

Fake your own AI chatbot with just Javascript and HTML. 

A very basic and German configuration is deployed [here](https://fakegpt.johanneslink.net/).
Try the question: "Ist eine ethische Nutzung von Generative AI möglich?"


## Prerequisite

- Installation of `nodejs` version >= 23

## Install and Run

```bash
npm install
```

```bash
npm start
```

Then move your browser to  http://localhost:3000.

## Run with Docker

```shell
docker build -t fakegpt .
docker run -it --rm -p 3000:3000 fakegpt:latest
```
   
For overriding answers and/or configuration add the respective volume mounts:

```shell
   -v /path/to/your/configuration.js:/app/public/configuration.js
   -v /path/to/your/answers.js:/app/public/answers.js
```

## Configuration of Texts

The texts that are displayed on the page are configured in 
file [configuration.js](./public/configuration.js).


## Configuration of Answers

The answering logic resides in file [answering.js](./public/answering.js)
whereas the actual answer texts are in [answers.js](./public/answers.js). 
You can either just modify the answer texts according to your own needs 
or change the whole answering mechanism.

The simplest way is to modify the `const myAnswers` object in file [answering.js](./public/answering.js);
it can have multiple properties.

Therein, a property _key_ can represent either 
- a regular expression within square brackets `[...]` 
- or a string to match some part of the user input - ignoring upper and lower case.

A property is an array of answer _segments_. Each segment can be one of:
- a literal html string that is rendered as is
- a function that takes the regular expression match array as argument 
  and returns an html string
- a number that will be interpreted as "thinking time" in milliseconds

A few examples:

```javascript
const myAnswers = {
        "hello": [
            "Hello! How can I help you?",
            "Maybe you want to ask me something?"
        ]
}
```

This will answer to any input that contains the word "hello" with the two given lines.

```javascript
const myAnswers = {
    [/hello|hallo/]: function (helloMatch) {
        var query = helloMatch[0];
        if (query.toLowerCase().includes("hallo")) {
            return [
                "<p>Hallo! Wie kann ich dir helfen?</p>",
                "<p>Vermute ich richtig, dass du Deutsch verstehst?</p>"
            ];
        }
        return ["Hello! How can I help you?"];
    }
}
```

This will answer to any input that contains the word "hello" or "hallo". 
If the input contains "hallo", the answer will be in German.

But you can also use the captured groupings of a regular expression:

```javascript
const myAnswers = {
  [/who is ([a-zA-Z\s]+)\\?|$/i]: function (whoIsMatch) {
    const name = whoIsMatch[1];
    return [
      `<p>I only know important people. 
       <span style="font-weight: bold">${name}</span> is none of them!</p>`
    ]
  }
}
```

### Answer does not match

If none of the key expressions match, the function `defaultAnswer` will be invoked
and its result used as answer. For example:

```javascript
export default function defaultAnswer(query) {
    return [
        `<p>I do not understand "${query}". What do you expect me to do?</p>`
    ]
}
```

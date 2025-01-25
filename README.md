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

   docker build -t fakegpt .
   docker run -it --rm -p 3000:3000 fakegpt:latest
   
For overriding answers add a volume mount:

   -v /path/to/your/answers.js:/app/public/answers.js


## Configuration of Texts

The texts that are displayed on the page are configured in 
file [configuration.js](./public/configuration.js).


## Configuration of Answers

The answering logic resides in
file [answers.js](./public/answers.js). You can modify the answers to your own needs.

The simplest way is to modify the `const answers` object that can have multiple properties.

Therein, a property _key_ can represent either 
- a regular expression within square brackets `[...]` 
- or a string to match some part of the user input - ignoring upper and lower case.

A property is an array of answer _segments_. A segment can be:
- a literal html string that is rendered as is
- a function that takes the full query as argument and returns an html string
- a number that will be interpreted as "thinking time" in milliseconds

A few examples:

```javascript
const answers = {
        "hello": [
            "Hello! How can I help you?",
            "Maybe you want to ask me something?"
        ]
}
```

This will answer to any input that contains the word "hello" with the two given lines.

```javascript
const answers = {
    [/hello|hallo/]: function (query) {
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

If none of the regular expressions match, the function `defaultAnswer` will be invoked
and its result used as answer.

export const arrayItems = [
    {
        name: 'Q&A',
        id: 'q&a',
        description: 'Answer questions based on existing knowledge',
        option: {
            model: "text-davinci-003",
            temperature: 0,
            max_tokens: 1024,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\n"],
        }
    },
    {
        name: 'Friend Chat',
        id: 'friendChat',
        description: 'Emulate a text message conversation.',
        option: {
            model: "text-davinci-003",
            temperature: 0.5,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
            stop: ["You:"],
        }
    },
    {
        name: 'Summarize for 2nd grader',
        id: 'summary',
        description: 'Translates difficult text into simpler concepts.'
    },
    {
        name: 'English to other languages',
        id: 'translate',
        description: 'Translate English into French, Spanish, and more!',
        option: {
            model: "text-davinci-003",
            temperature: 0.3,
            max_tokens: 100,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        }
    },
    {
        name: 'Movie to Emoji',
        id: 'movieToEmoji',
        description: 'Convert movie titles into emoji',
        option: {
            model: "text-davinci-003",
            temperature: 0.8,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\n"],
        }
    },
    {
        name: 'Explain code',
        id: 'explainCode',
        description: 'Explian a complicated piece of code'
    },
    {
        name: 'JavaScript to Python',
        id: 'jstopy',
        description: 'Convert simple JavaScript expressions into Python'
    }
]
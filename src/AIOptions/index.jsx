export const arrayItems = [
    {
        name: 'Q&A',
        id: 'q&a',
        description: 'Answer questions based on existing knowledge',
        placeholder: 'Ask a question based in reality, no funny business',
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
        name: 'Create Images',
        id: 'createImage',
        description: 'Create 4 images using ChatGPT API',
        placeholder: 'Describe the image you want to create. You will get 4.',
        option: {
            n: 4,
            size: "1024x1024",
        }
    },
    {
        name: 'Friend Chat',
        id: 'friendChat',
        description: 'Emulate a text message conversation.',
        placeholder: 'Have a fun chat with the friend bot',
        option: {
            model: "text-davinci-003",
            temperature: 0.5,
            max_tokens: 500,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
            stop: ["You:"],
        }
    },
    {
        name: 'Summarize for 2nd grader',
        id: 'summary',
        description: 'Translates difficult text into simpler concepts.',
        placeholder: 'Summarize this for a second-grade student:',
        option: {
            model: "text-davinci-003",
            temperature: 0.7,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        }
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
        placeholder: 'Convert movie titles into emoji: The Matrix',
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
        description: 'Explian a complicated piece of code',
        placeholder: 'Enter code ....',
        option: {
            model: "code-davinci-002",
            temperature: 0,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\"\"\""]
        }
    }
]
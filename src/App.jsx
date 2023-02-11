import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import './App.scss'

function App() {
  const [prompt, setPrompt] = useState("");
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    console.log(res.data.data[0].url);
  } 

  return (
    <div className="app-main">
      <h1>Generate Image using OpenAiAPI</h1>
      <input type="text" 
        placeholder="Type a prompt to generate an image"
        className="app-input" 
        onChange={(e) => setPrompt(e.target.value)} 
      />
      <button onClick={generateImage}>Generate an Image</button>
    </div>
  );
}

export default App
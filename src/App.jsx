import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import './App.scss'

function App() {

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {

    const [prompt, setPrompt] = useState("");

    const res = await openai.createImage({
      prompt: "a white siamese cat",
      n: 1,
      size: "1024x1024",
    });
    console.log(res.data.data[0].url);
  } 

  return (
    <div className="app-main">
      <input type="text" />
      <button onClick={generateImage}>Generate an Image</button>
    </div>
  );
}

export default App

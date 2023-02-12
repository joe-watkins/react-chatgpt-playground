import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import './App.scss'
import Translation from './components/Translation';
import OptionSelection from './components/OptionSelection';
import { arrayItems } from './AIOptions';

function App() {

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const [option, setOption] = useState({});
  const [chosenType, setChosenType] = useState("");
  const [chosenID, setChosenID] = useState("");
  const [input, setInput] = useState("");
  const [result,setResult] = useState("");
  const [imgAlt, setImgAlt] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  const resetState = () => {
    setResult("");
    setImgAlt("");
    setPlaceholder("");
  }

  const selectOption = (option) => {
    setOption(option);
    resetState();
  }

  const doStuff = async () => {
    resetState();
    const response = await openai.createCompletion({
      model: option.model,
      prompt: input,
      temperature: option.temperature,
      max_tokens: option.max_tokens,
      top_p: option.top_p,
      frequency_penalty: option.frequency_penalty,
      presence_penalty: option.presence_penalty,
    });
    // console.log(response.data);
    setResult(response.data.choices[0].text);
  }

  const generateImage = async () => {
    resetState();
    const response = await openai.createImage({
      prompt: input,
      n: option.n,
      size: option.size,
    });
    setResult(response.data.data[0].url);
    setImgAlt(input);
  } 

  return (
    <div className="gpt-chat-app">
      {Object.values(option).length === 0 ? (
          <OptionSelection arrayItems={arrayItems} selectOption={selectOption} setChosenType={setChosenType} setChosenID={setChosenID} setPlaceholder={setPlaceholder} />
        ) : (
          <Translation doStuff={doStuff} setInput={setInput} result={result} setOption={setOption} chosenType={chosenType} chosenID={chosenID} generateImage={generateImage} setImgAlt={setImgAlt} imgAlt={imgAlt} placeholder={placeholder} />
        )}
    </div>
  );
}

export default App

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
  const [input, setInput] = useState("");
  const [result,setResult] = useState("");

  const selectOption = (option) => {
    setOption(option);
  }

  const doStuff = async () => {
    setResult("");
    let object = { ...option, prompt: input + "A:" };
    const response = await openai.createCompletion(object);
    setResult(response.data.choices[0].text);
  }

  return (
    <div className="gpt-chat-app">
      {Object.values(option).length === 0 ? (
          <OptionSelection arrayItems={arrayItems} selectOption={selectOption} />
        ) : (
          <Translation doStuff={doStuff} setInput={setInput} result={result} setOption={setOption} />
        )}
    </div>
  );
}

export default App

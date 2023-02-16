import { useState, useEffect } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import './App.scss'
import state from './constants/constants';
import Translation from './components/Translation';
import OptionSelection from './components/OptionSelection';
import { arrayItems } from './AIOptions';
import { CircularProgress } from "react-loading-indicators";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

function App() {

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);
  const [option, setOption] = useState(state.option);
  const [chosenType, setChosenType] = useState(state.chosenType);
  const [chosenID, setChosenID] = useState(state.chosenID);
  const [input, setInput] = useState(state.input);
  const [result,setResult] = useState(state.result);
  const [imgAlt, setImgAlt] = useState(state.imgAlt);
  const [placeholder, setPlaceholder] = useState(state.placeholder);
  const [isLoading, setIsLoading] = useState(state.isLoading);
  const [apiError, setApiError] = useState(state.apiError);
  const [imgResult, setImgResult] = useState(state.imgResult);
  const [chatlog, setChatLog] = useState([]);
  const [chatTextEntry, setChatTextEntry] = useState("");

  const usersCollectionRef = collection(db, "chat_log");

  useEffect(() => {

    /* output all of the docs in the table by updating state */
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      /* update the state of setUsers by iterating through the data.docs array using .data() built-in function for handling the crazy dot notation as well as grab the ID for edit/delete */
      // setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
      console.log(data.docs);
    }

    getUsers();

  }, []);

  const resetState = () => {
    setResult("");
    setImgAlt("");
    setPlaceholder("");
    setApiError(false);
    setChatTextEntry("");
  }

  const selectOption = (option) => {
    setOption(option);
    resetState();
  }

  const doStuff = async () => {
    resetState();
    setIsLoading(true);

    // add to chat log from the user
    setChatLog(prevChatLog => [...prevChatLog, { id: Number(prevChatLog.length +1), sender: "User", message: input }]);

    try {
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
        setIsLoading(false);
        setResult(response.data.choices[0].text);
        // add to chat log from ChatGPT
        setChatLog(prevChatLog => [...prevChatLog, { id: Number(prevChatLog.length +1), sender: "ChatGPT", message: response.data.choices[0].text }]);
    } catch (error) {
      if (error.response) {
        setResult(error.response.data.error.message);
        setApiError(true);
        setIsLoading(false);
      } else {
        console.log(error.message);
      }
    }
  }

  const generateImage = async () => {
    resetState();
    setIsLoading(true);

    try {
      const response = await openai.createImage({
        prompt: input,
        n: option.n,
        size: option.size,
      });
      setIsLoading(false);
      Object.keys(response.data.data).forEach(key => {
        setImgResult(prevState => ({
          ...prevState,
          [key]: response.data.data[key]
        }));
      });
      // console.log(imagesResponse);
      setResult(response.data.data[0].url);
      setImgAlt(input);
    } catch (error) {
      if (error.response) {
        setResult(error.response.data.error.message);
        setIsLoading(false);
        setApiError(true);
      } else {
        console.log(error.message);
      }
    }
  } 

  return (
    <div className="gpt-chat-app">
      {Object.values(option).length === 0 ? (
          <OptionSelection 
            arrayItems={arrayItems} 
            selectOption={selectOption} 
            setChosenType={setChosenType} 
            setChosenID={setChosenID} 
            setPlaceholder={setPlaceholder} 
          />
        ) : (
          <Translation 
            doStuff={doStuff} 
            setInput={setInput} 
            result={result} 
            setOption={setOption} 
            chosenType={chosenType} 
            chosenID={chosenID} 
            generateImage={generateImage} 
            setImgAlt={setImgAlt} 
            imgAlt={imgAlt} 
            placeholder={placeholder} 
            CircularProgress={CircularProgress} 
            isLoading={isLoading} 
            apiError={apiError} 
            imgResult={imgResult}
            chatlog={chatlog}
            setChatLog={setChatLog}
            chatTextEntry={chatTextEntry}
            setChatTextEntry={setChatTextEntry}
          />
        )}
    </div>
  );
}

export default App

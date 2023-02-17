import { useState, useEffect } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import './App.scss'
import state from './constants/constants';
import Translation from './components/Translation';
import OptionSelection from './components/OptionSelection';
import { arrayItems } from './AIOptions';
import { CircularProgress } from "react-loading-indicators";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc } from "firebase/firestore";

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
  const [firebaseCollections, setFirebaseCollections] = useState([]);
  const [firebaseChats, setFirebaseChat] = useState([]);

  const chatCollectionsRef = collection(db, "chat_log");
  const chatDocumentsRef = collection(db, "/chat_log/JJJDKKK8767/chats");

  useEffect(() => {

    /* output all of the docs in the table by updating state */
    const getFirebaseCollections = async () => {
      const data = await getDocs(chatCollectionsRef);
  
      // map the documents into the desired format
      const chats = data.docs.map((doc) => ({
        id: doc.id
      }));
  
      // update the state variable with the mapped array
      setFirebaseCollections(chats);

      console.log(firebaseCollections);

    };
  
    getFirebaseCollections();
    //getFirebaseChat('JJJDKKK8767');


  }, []);

  /* output all of the docs in the table by updating state */
  const getFirebaseChat = async (targetChat) => {
    const data = await getDocs(collection(db, "/chat_log/"+targetChat+"/chats"));

    // map the documents into the desired format
    const chats = data.docs.map((doc) => ({
      id: doc.id,
      user: doc.data().user,
      message: doc.data().message
    }));

    // update the state variable with the mapped array
    setFirebaseChat(chats);

    console.log(firebaseChats);

  };

  const createChat = async () => {
    /* Create user - take the fields defined in db using: addDoc */
    /* TODO: figure out how to add a collection and then add a document to that collection */
    // await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    // https://saveyourtime.medium.com/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b

    // Using Firebase, create a new Document in the "chat_log" collection from a function that takes a variable and add a Collection to that Document called "chats". Iterate over the chatlog array and add each chat to the "chats" collection.
    const newChatLog = await setDoc(doc(db, "chat_log", "Nutsack6"), {});
    //const newChatLogID = newChatLog.id;
    // console.log(newChatLogID);

    const newCollectionRef = collection(db, 'chat_log', "Nutsack6", 'chats');

    await addDoc(newCollectionRef, {
        data: 'Hello there World',
    })
    
    // add the chats to the new collection
    /*
    chatlog.forEach((chat) => {
      addDoc(collection(db, "/chat_log/Nutsack2/chats"), {});
    });
    */

    // update the state variable with the mapped array
    setFirebaseCollections(prevState => [...prevState, { id: "Nutsack6" }]);
  };

  const deleteChatLog = async (targetChat) => {
    // delete the collection
    await deleteDoc(doc(db, "/chat_log/"+targetChat));
    // update the state variable with the mapped array
    setFirebaseCollections(prevState => prevState.filter((chat) => chat.id !== targetChat));
  };

  console.log(firebaseCollections);
  console.log(firebaseChats);

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
        createChat();
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
    <>
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
      <ul>
      {firebaseCollections.map((chat) => (
        <li key={chat.id}>
          <button onClick={() => getFirebaseChat(chat.id)}>{chat.id}</button>
        </li>
      ))}
    </ul>
    {firebaseChats.length !== 0 &&
      <ul>
        {firebaseChats.map((chat) => (
          <li key={chat.id}>
            <strong>{chat.user}:</strong> {chat.message}
          </li>
        ))}
      </ul>
    }
    </>
  );
}

export default App

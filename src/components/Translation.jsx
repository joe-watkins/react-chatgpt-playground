import React from 'react'

export default function Translation({ doStuff, setInput, result, setOption, chosenType }){
    return (
        <div>
            <h1>{chosenType}</h1>
            <textarea 
                className="text-area" 
                cols={80} 
                rows={10} 
                onChange={(e) => setInput(e.target.value)}>            
            </textarea>
            <button className="action-btn" onClick={doStuff}>Do your stuff!</button>
            <h3>{result.length > 0 ? result : ""}</h3>
            <a href="#" onClick={(e) => setOption({})}>&lt; Back</a>
        </div>
    )
}
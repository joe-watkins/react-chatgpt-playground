import React from 'react'

export default function Translation({ doStuff, setInput, result, setOption, chosenType, chosenID, generateImage, setImgAlt, imgAlt, placeholder, CircularProgress, isLoading }){
    return (
        <div>
            <h1>{chosenType}</h1>
            <textarea 
                className="text-area" 
                cols={80} 
                rows={10} 
                placeholder={placeholder}
                onChange={(e) => {
                    setInput(e.target.value);
                    setImgAlt(e.target.value);
                }}
                aria-label="Enter your query"
            >            
            </textarea>
            {chosenID !== 'createImage' && 
                <>
                    <button className="action-btn" onClick={doStuff}>Do your stuff!</button>
                    <p className="api-result">{result.length > 0 ? result : ""}</p>
                </>
            }
            {chosenID === 'createImage' && 
                <>
                    <button className="action-btn" onClick={generateImage}>Generate Image!</button>
                </>
            }
            {isLoading === true && 
                <>
                    <div className="loading-indicator">
                        <CircularProgress color="white" style={{ fontSize: "6px" }} />
                    </div>
                </>
            }
            {result.length > 0 && chosenID === 'createImage' ? <>
                <div className="generated-img">
                    <img className="result-image" src={result} alt={imgAlt} />
                </div>
            </> : <></>}
            <div className="back-trigger"><a href="#" onClick={(e) => setOption({})}>&lt; Back</a></div>
        </div>
    )
}
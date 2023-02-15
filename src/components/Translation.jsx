import React from 'react'

export default function Translation({ doStuff, setInput, result, setOption, chosenType, chosenID, generateImage, setImgAlt, imgAlt, placeholder, CircularProgress, isLoading, apiError, imgResult, chatlog, setChatLog}){
    return (
        <div>
            <h1 id="chosen-type">{chosenType}</h1>
            {chatlog.map((chat) => (
                <>
                    <div>{chat.id} {chat.sender} {chat.message}</div>
                </>
            ))}
            <textarea 
                className="text-area" 
                cols={80} 
                rows={10} 
                placeholder={placeholder}
                onChange={(e) => {
                    setInput(e.target.value);
                    setImgAlt(e.target.value);
                }}
                aria-labelledby="chosen-type"
            >            
            </textarea>

            {chosenID !== 'createImage' && 
                <>
                    <button className="action-btn" onClick={doStuff}>Do your stuff!</button>
                    <p role="status" className="api-result">{result.length > 0 ? result : ""}</p>
                </>
            }

            {chosenID === 'createImage' && 
                <>
                    <button className="action-btn" onClick={generateImage}>Generate Images!</button>
                </>
            }

            {isLoading === true && 
                <>
                    <div className="loading-indicator" role="status">
                        <span className="visuallyhidden">loading</span>
                        <span aria-hidden="true">
                            <CircularProgress color="auto" style={{ fontSize: "6px" }} />
                        </span>
                    </div>
                </>
            }


            <div className="generated-images" role="status">
            {result.length > 0 && chosenID === 'createImage' && !apiError && 
                <span className="visuallyhidden">Image created</span>
            }
                <div className="image-grid">
                    {result.length > 0 && chosenID === 'createImage' && !apiError ? (
                    <>
                        {Object.keys(imgResult).map(key => (
                        <div key={key} className="generated-img">
                            <img
                            className="result-image"
                            src={imgResult[key].url}
                            alt={imgAlt}
                            />
                        </div>
                        ))}
                    </>
                    ) : (
                    <></>
                    )}
                </div>
            </div>

            {result.length > 0 && chosenID === 'createImage' && apiError ? <>
                <div className="api-error" role="alert">
                    <p className="api-result">{result.length > 0 ? result : ""}</p>
                </div>
            </> : <></>}

            <div className="back-trigger"><a href="#" onClick={(e) => setOption({})}>&lt; Back</a></div>

        </div>
    )
}
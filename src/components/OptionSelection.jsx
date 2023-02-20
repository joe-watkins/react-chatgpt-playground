import React from 'react'

export default function OptionSelection({ arrayItems, selectOption, setChosenType, setChosenID, setPlaceholder }) {
    return <>
        <h1>React AI APP!</h1>
        <div className="grid-main">
            {arrayItems.map((item) => {
                return (
                    <button key={item.id} className="grid-child" onClick={() => {
                        selectOption(item.option); 
                        setChosenType(item.name);
                        setChosenID(item.id);
                        setPlaceholder(item.placeholder);
                    }}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                    </button>
                )
            })}
        </div>
    </>
}
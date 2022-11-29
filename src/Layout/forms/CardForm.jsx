import React from 'react'
import { useNavigate } from "react-router-dom"
import cardform from "./cardform.module.css"
function CardForm({formData, handleSubmit, handleChange, deckId}) {
    const navigate = useNavigate()
    return ( 
    <div className={cardform["card-form-container"]}>
        <form className={cardform["card-form"]} onSubmit={handleSubmit}>
            <div className={cardform["card-form-row"]}>
                <label htmlFor='front'>
                    Front
                    <textarea
                        className={cardform["card-form-input"]}
                        type="text"
                        id="front"
                        name="front"
                        placeholder='Front side of card'
                        onChange={handleChange}
                        value={formData.front}
                    />
                </label>
            </div>
            <div className={cardform["card-form-row"]}>
                <label htmlFor='back'>
                    Back
                    <textarea
                        className={cardform["card-form-input"]}
                        type="text"
                        id="back"
                        name="back"
                        placeholder='Back side of card'
                        onChange={handleChange}
                        value={formData.back}
                    />
                </label>
            </div>
            <button onClick={()=> navigate(`/decks/${deckId}`)}>Done</button>
            <button type='submit' >Submit</button>
        </form>
    </div>
    );
}

export default CardForm;
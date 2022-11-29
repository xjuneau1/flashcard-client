import React from 'react';
import { useNavigate, useParams } from "react-router-dom"
import deckform from "./deckform.module.css"
function DeckForm({ handleSubmit, handleChange, formData, pageName }) {
    const navigate = useNavigate()
    const {deck_id} = useParams()

    return ( 
    <div className={deckform["deck-form-container"]}>
        <h3>{pageName}</h3>
        <form className={deckform["deck-form"]} onSubmit={handleSubmit}>
            <div className={deckform["deck-form-row"]}>
                <label htmlFor='name'>
                    Deck Name
                    <input
                        className={deckform["deck-form-input"]}
                        type="text"
                        id="name"
                        name="name"
                        palceholder="Deck Name"
                        onChange={handleChange}
                        value={formData.name}
                    >
                    </input>
                </label>
            </div>
            <div className={deckform["deck-form-row"]}>
                <label htmlFor='description'>
                    Deck Description
                    <input
                        className={deckform["deck-form-input"]}
                        type="textarea"
                        id="description"
                        name="description"
                        rows="5"
                        palceholder="Deck Description"
                        onChange={handleChange}
                        value={formData.description}
                    >
                    </input>
                </label>
            </div>
            <button className={deckform["deck-form-submit"]} type="submit">Submit</button>
            <button className={deckform["deck-form-cancel"]} onClick={()=> {
                if(deck_id){
                   return navigate(`/decks/${deck_id}`)
                }
                navigate("/")
            }}>Cancel</button>
        </form>
    </div> 
    );
}

export default DeckForm;
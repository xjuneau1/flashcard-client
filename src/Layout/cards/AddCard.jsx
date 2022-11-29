import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom"
import { createCard } from "../../utils/api"
import Breadcrumb from '../Breadcrumb';
import CardForm from '../forms/CardForm';
import addcard from "./addcard.module.css"
function AddCard({deck, pageName}) {
    const { deck_id } = useParams()
    const navigate = useNavigate()
    const initFormData = {
        front:"",
        back:""
    }
    const [formData, setFormData] = useState(initFormData)
    const [error, setError] = useState(null)

    const handleAddCard = async (event) => {
        event.preventDefault()
        const abortController = new AbortController()
        try {
            if(window.confirm("Create this card?\n\n You may edit this card later.")){
                const newCard = await createCard(deck_id, formData, abortController.signal)
                console.log(newCard)
                setTimeout(navigate(`/decks/${deck_id}`), 3000)
            }
        } catch (err) {
            setError(err)
            console.log(err)
        }
    }

    const handlePropChange = ({ target }) => {
        setFormData({...formData, [target.name]: target.value})
        console.log(formData)
    }
    return ( 
        <div className={addcard["add-card-container"]}>
            <Breadcrumb deck={deck} pageName={pageName} />
            <h3>{deck.name}: {pageName}</h3>
            <CardForm formData={formData} handleSubmit={handleAddCard} handleChange={handlePropChange} deckId={deck_id} />
        </div> 
    );
}

export default AddCard;
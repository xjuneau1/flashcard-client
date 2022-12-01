import React, { useEffect, useState } from 'react';
import {Routes, Route, useParams, useNavigate} from "react-router-dom"
import {readDeck} from "../../utils/api"
import DeckView from "./DeckView"
import Study from './Study';
import EditDeck from './EditDeck';
import AddCard from '../cards/AddCard';
import EditCard from '../cards/EditCard';
import decks from "./deck.module.css"
function Deck({deck, setDeck, error, setError}) {
    const { deck_id } = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        const abortController = new AbortController()
        async function getDeckById(){
            try {
                const data = await readDeck(deck_id, abortController.signal)
                setDeck(data)
            } catch (err) {
                setError(err)
                console.log(error)
            }
        }
        getDeckById()

        return () => abortController.abort()
    },[deck_id, deck.cards])

    return ( 
    <div className={decks["deck-container"]}>
        <Routes>
            <Route path="/" element={<DeckView deck={deck} error={error} navigate={navigate} />} />
            <Route path="/study" element={<Study deck={deck} error={error} pageName={"Study"} />} />
            <Route path="/edit" element={<EditDeck deck={deck} error={error} pageName={"Edit Deck"} />} />
            <Route path="/cards/new" element={<AddCard deck={deck} error={error} pageName={"Add Card"} />} />
            <Route path="/cards/:card_id/edit" element={<EditCard deck={deck} error={error} pageName={"Edit Card"} />} />      
        </Routes>
    </div> 
    );
}

export default Deck;
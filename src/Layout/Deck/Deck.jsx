import React, { useEffect, useState } from 'react';
import {Routes, Route, useParams, useNavigate} from "react-router-dom"
import DeckView from "./DeckView"
import Study from './Study';
import {readDeck} from "../../utils/api"
import decks from "./deck.module.css"
import EditDeck from './EditDeck';
import AddCard from '../cards/AddCard';
function Deck() {
    const [deck, setDeck] = useState({})
    const [error, setError] = useState(null)
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
    },[deck_id])

    return ( 
    <div className={decks["deck-container"]}>
        <Routes>
            <Route path="/" element={<DeckView deck={deck} navigate={navigate} />} />
            <Route path="/study" element={<Study deck={deck} pageName={"Study"} />} />
            <Route path="/edit" element={<EditDeck deck={deck} pageName={"Edit Deck"} />} />
            <Route path="/cards/new" element={<AddCard deck={deck} pageName={"Add Card"} />} />     
        </Routes>
    </div> 
    );
}

export default Deck;
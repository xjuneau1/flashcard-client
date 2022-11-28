import React, { useEffect, useState } from 'react';
import {Routes, Route, useParams} from "react-router-dom"
import DeckView from "./DeckView"
import Study from './Study';
import {readDeck} from "../../utils/api"
import decks from "./deck.module.css"

function Deck() {
    const [deck, setDeck] = useState({})
    const [error, setError] = useState(null)
    const { deck_id } = useParams()
    useEffect(()=>{
        const abortController = new AbortController()
        async function getDeckById(){
            try {
                const data = await readDeck(deck_id, abortController.signal)
                setDeck(data)
                setTimeout(console.log(data), 3000)
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
            <Route path="/" element={<DeckView deck={deck} />} />
            <Route path="/study" element={<Study deck={deck} pageName={"Study"} />} />  
        </Routes>
    </div> 
    );
}

export default Deck;
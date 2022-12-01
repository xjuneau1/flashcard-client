import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
import DeckList from './DeckList';
import { listDecks } from '../../utils/api';
import home from "../Home/home.module.css"
import Breadcrumb from '../Breadcrumb';
import ErrorAlert from '../Error/ErrorAlert';
function Home({decks, setDecks, error, setError}) {
    
    useEffect(()=>{
        const abortController = new AbortController()
        async function getDecks(){
            try {
                const data = await listDecks(abortController.signal)
                await setDecks(data)
            } catch (err) {
                setError(err)
            }
        }
        getDecks()

        return () => abortController.abort()
    },[])
    const [errorState, setErrorState] = useState(false)
    return (
        <div className={home["home-container"]}>
            <ErrorAlert error={error} errorState={errorState} setErrorState={setErrorState} />
            {errorState ? <></>:<Link className={home["home-link"]} to="/decks/new">Create Deck</Link>}
            <DeckList decks={decks} setDecks={setDecks} />
        </div>
     );
}

export default Home;
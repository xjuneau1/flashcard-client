import React, { useEffect } from 'react';
import {Link} from "react-router-dom"
import DeckList from './DeckList';
import { listDecks } from '../../utils/api';
import home from "../Home/home.module.css"
import Breadcrumb from '../Breadcrumb';
function Home({decks, setDecks}) {

    useEffect(()=>{
        const abortController = new AbortController()
        async function getDecks(){
            const data = await listDecks(abortController.signal)
            await setDecks(data)
        }
        getDecks()

        return () => abortController.abort()
    },[])

    return ( 
        <div className={home["home-container"]}>
            <Breadcrumb />
            <Link className={home["home-link"]} to="/decks/new">Create Deck</Link>
            <DeckList decks={decks} setDecks={setDecks} />
        </div>
     );
}

export default Home;
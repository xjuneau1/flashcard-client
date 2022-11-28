import React, { useEffect } from 'react';
import {Link} from "react-router-dom"
import DeckList from './DeckList';
import { listDecks } from '../../utils/api';
function Home({decks, setDecks}) {

    useEffect(()=>{
        const abortController = new AbortController()
        async function getDecks(){
            const data = await listDecks(abortController.signal)
            await setDecks(data)
            setTimeout(console.log(data), 3000)
        }
        getDecks()

        return () => abortController.abort()
    },[])

    return ( 
        <div>
            <Link to="/decks/new">Create Deck</Link>
            <DeckList decks={decks} setDecks={setDecks} />
        </div>
     );
}

export default Home;
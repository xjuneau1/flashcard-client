import React from 'react'
import {Link} from "react-router-dom"
function Breadcrumb({deck, pageName}) {
    return ( 
        <div className='breadcrumb-container'>
            <Link to="/">Home</Link>
            <Link to={`/decks/${deck.deck_id}`}>{deck.name}</Link> {pageName ? "/": ""}
            <div>{pageName}</div>
        </div>
     );
}

export default Breadcrumb;
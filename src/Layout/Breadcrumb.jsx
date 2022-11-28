import React from 'react'
import {Link} from "react-router-dom"
import breadcrumb from "./breadcrumb.module.css"

function Breadcrumb({deck, pageName}) {

    if (!deck){
        return (
            <div className={breadcrumb["breadcrumb-container"]}>
                <Link className={breadcrumb["breadcrumb-link"]} to="/">Home</Link><div>/</div>
            </div> 
        )
    }
    return ( 
        <div className={breadcrumb["breadcrumb-container"]}>
            <Link className={breadcrumb["breadcrumb-link"]} to="/">Home</Link><div>/</div>
            <Link className={breadcrumb["breadcrumb-link"]} to={`/decks/${deck.deck_id}`}> {deck.name}</Link> {pageName ? "/": ""}
            <div className={breadcrumb["breadcrumb-pagename"]}>{pageName}</div>
        </div>
     );
}

export default Breadcrumb;
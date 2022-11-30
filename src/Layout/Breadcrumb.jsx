import React, { useEffect } from 'react'
import {Link, useLocation} from "react-router-dom"
import breadcrumb from "./breadcrumb.module.css"

function Breadcrumb({deck, pageName, setPageName}) {
    let url = useLocation().pathname
    
    useEffect(()=>{
        let lastDir = url.substring(url.lastIndexOf("/")).replace("/", "")
        let uppercaseLastDir = lastDir.charAt(0).toUpperCase() + lastDir.slice(1)
        setPageName(uppercaseLastDir)
    }, [url])
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
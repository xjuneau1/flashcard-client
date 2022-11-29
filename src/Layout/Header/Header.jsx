import React from 'react';
import header from "../Header/header.module.css"
function Header() {
    return ( 
        <div className={header['header']}>
            <div className={header['header-title']}>Studiest: <div className={header['header-subtitle']}>Make and study flashcards!</div></div>
        </div>
     );
}

export default Header;
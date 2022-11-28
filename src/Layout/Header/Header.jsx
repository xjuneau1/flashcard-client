import React from 'react';
import header from "../Header/header.module.css"
function Header() {
    return ( 
        <div className={header['header']}>
            <div className={header['header-title']}>FlashCard Mania</div>
        </div>
     );
}

export default Header;
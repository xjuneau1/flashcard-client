import React from 'react'
import erroralert from "./erroralert.module.css"
function ErrorAlert({ error, errorState, setErrorState }) {
  if(error && typeof error.message == "string"){
    setErrorState(true)
    return (
      error && (
        <div className={erroralert["error-container"]}>Error: {error.message}</div>
      )
    );
  }
  
  }

export default ErrorAlert;
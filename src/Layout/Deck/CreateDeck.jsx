import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeckForm from "../forms/DeckForm";
import createdeck from "./createdeck.module.css";
import { createDeck } from "../../utils/api";
import ErrorAlert from "../Error/ErrorAlert";

function CreateDeck({error}) {
  const initFormData = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState(initFormData);
  const navigate = useNavigate();

  const handleCreateDeck = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      if (
        window.confirm("Create this deck? \n\n You may edit this deck later.")
      ) {
        const newDeck = await createDeck(formData, abortController.signal);
        navigate(`/decks/${newDeck.deck_id}`);
      } else {
        return;
      }
    } catch (err) {
      setError(err);
      setTimeout(console.log(error), 3000)
    }
    return () => abortController.abort();
  };

  const handlePropChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  return (
    <div className={createdeck["create-container"]}>
      <ErrorAlert error={error} />
      <DeckForm
        handleSubmit={handleCreateDeck}
        handleChange={handlePropChange}
        formData={formData}
        pageName={"Create Deck"}
      />
    </div>
  );
}

export default CreateDeck;

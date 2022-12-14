import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readCard, updateCard } from "../../utils/api";
import CardForm from "../forms/CardForm";
import ErrorAlert from "../Error/ErrorAlert";
import editcard from "./editcard.module.css";
function EditCard({ deck, pageName, error }) {
  const { card_id } = useParams();
  const initFormData = {
    front: "",
    back: ""
  };

  const [formData, setFormData] = useState(initFormData);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    async function getCard() {
      try {
        const card = await readCard(card_id, abortController.signal);
        setFormData(card);
      } catch (err) {
        setError(err);
      }
    }
    getCard();
    return () => abortController.abort();
  }, [card_id]);

  const handleEditCard = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      if(window.confirm("Update this card?\n\n You may return here to continue editing after submtting.")){
        await updateCard(card_id, formData, abortController.signal);
        setTimeout(navigate(`/decks/${deck.deck_id}`), 3000);
      }
    } catch (err) {
      setError(err);
    }
  };

  const handlePropChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
    console.log(formData)
  };

  return (
    <div className={editcard["edit-card-container"]}>
      <ErrorAlert error={error} />
      <h3>{deck.name}: {pageName}</h3>
      <CardForm
        formData={formData}
        handleSubmit={handleEditCard}
        handleChange={handlePropChange}
        deckId={deck.deck_id}
      />
    </div>
  );
}

export default EditCard;

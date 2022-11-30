import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, updateDeck} from "../../utils/api";
import DeckForm from "../forms/DeckForm";
import editdeck from "./editdeck.module.css";

function EditDeck({ deck, pageName }) {
  const initFormData = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initFormData);
  const [error, setError] = useState(null);
  const { deck_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    async function getDeck() {
      try {
        const data = await readDeck(deck_id, abortController.signal);
        setFormData({ name: data.name, description: data.description });
      } catch (err) {
        setError(err);
        console.log(err);
      }
    }
    getDeck();
    return () => abortController.abort();
  }, []);

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      if (window.confirm("Submit these changes?")) {
        await updateDeck(deck_id, formData, abortController.signal);
        navigate(`/decks/${deck_id}`);
      }
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const handlePropChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
    console.log(formData);
  };

  return (
    <div className={editdeck["edit-deck-container"]}>
      <DeckForm
        handleSubmit={handleSubmitEdit}
        handleChange={handlePropChange}
        formData={formData}
        pageName={pageName}
      />
    </div>
  );
}

export default EditDeck;

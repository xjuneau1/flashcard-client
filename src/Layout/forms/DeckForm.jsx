import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import deckform from "./deckform.module.css";
function DeckForm({ handleSubmit, handleChange, formData, pageName }) {
  const navigate = useNavigate();
  const { deck_id } = useParams();

  return (
    <div className={deckform["deck-form-container"]}>
      <h3>{pageName}</h3>
      <form className={deckform["deck-form"]} onSubmit={handleSubmit}>
        <div className={deckform["deck-form-row"]}>
          <fieldset>
            <legend>Deck Name</legend>
            <label className={deckform["deck-form-label"]} htmlFor="name">
              <input
                className={deckform["deck-form-input"]}
                type="text"
                id="name"
                name="name"
                placeholder="Deck Name"
                onChange={handleChange}
                value={formData.name}
              ></input>
            </label>
          </fieldset>
        </div>
        <div className={deckform["deck-form-row"]}>
          <fieldset>
            <legend>Description</legend>
            <label
              className={deckform["deck-form-label"]}
              htmlFor="description"
            >
              <textarea
                className={deckform["deck-form-input"]}
                type="text"
                id="description"
                name="description"
                rows="7"
                palceholder="Deck Description"
                onChange={handleChange}
                value={formData.description}
              ></textarea>
            </label>
          </fieldset>
        </div>
        <div className={deckform["deck-form-control"]}>
        <button className={deckform["deck-form-button"]} type="submit">
          Submit
        </button>
        <button
          className={deckform["deck-form-button"]}
          onClick={() => {
            if (deck_id) {
              return navigate(`/decks/${deck_id}`);
            }
            navigate("/");
          }}
        >
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
}

export default DeckForm;

import React from "react";
import { useNavigate } from "react-router-dom";
import cardform from "./cardform.module.css";
function CardForm({ formData, handleSubmit, handleChange, deckId }) {
  const navigate = useNavigate();
  return (
    <div className={cardform["card-form-container"]}>
      <form className={cardform["card-form"]} onSubmit={handleSubmit}>
        <div className={cardform["card-form-row"]}>
          <fieldset>
            <legend>Front</legend>
            <label className={cardform["card-form-label"]} htmlFor="front">
              <textarea
                className={cardform["card-form-input"]}
                type="text"
                id="front"
                name="front"
                rows="5"
                placeholder="Front side of card"
                onChange={handleChange}
                value={formData.front}
              />
            </label>
          </fieldset>
        </div>
        <div className={cardform["card-form-row"]}>
          <fieldset>
            <legend>Back</legend>
            <label className={cardform["card-form-label"]} htmlFor="back">
              <textarea
                className={cardform["card-form-input"]}
                type="text"
                id="back"
                name="back"
                rows="5"
                placeholder="Back side of card"
                onChange={handleChange}
                value={formData.back}
              />
            </label>
          </fieldset>
        </div>
        <div className={cardform["card-form-control"]}>
          <button className={cardform["card-form-button"]} onClick={() => navigate(`/decks/${deckId}`)}>Done</button>
          <button className={cardform["card-form-button"]} type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CardForm;

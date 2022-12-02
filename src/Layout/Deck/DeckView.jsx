import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, deleteCard } from "../../utils/api";
import ErrorAlert from "../Error/ErrorAlert";
import deckview from "./deckview.module.css";
function DeckView({ deck, navigate, error}) {
  const handleDeleteDeck = async () => {
    const abortController = new AbortController();
    if (
      window.confirm(
        "Delete this deck? \n\n You will not be able to recover it."
      )
    ) {
      await deleteDeck(deck.deck_id, abortController.signal);
      return navigate("/");
    }
  };

  return (
    <>
    <ErrorAlert error={error} />
      {Object.keys(deck).length ? (
        <div className={deckview["view-deck-container"]}>
          <div className={deckview["deck-info"]}>
            <h5>No. of cards: {deck.cards.length}</h5>
            <h3>{deck.name}</h3>
            <h4>Description:</h4>
            <p>{deck.description}</p>
            <div className={deckview["deck-controls"]}>
              <Link
                className={deckview["deck-link"]}
                to={`/decks/${deck.deck_id}/edit`}
              >
                Edit
              </Link>
              <Link
                className={deckview["deck-link"]}
                to={`/decks/${deck.deck_id}/study`}
              >
                Study
              </Link>
              <Link
                className={deckview["deck-link"]}
                to={`/decks/${deck.deck_id}/cards/new`}
              >
                Cards
              </Link>
              <button onClick={handleDeleteDeck}>Delete Deck</button>
            </div>
          </div>
          {deck.cards.map((card) => {
            return (
              <div
                className={deckview["card-container"]}
                key={card.card_id}
                id={card.card_id}
              >
                <div className={deckview["card-row"]}>
                  <h5>Card # {card.card_id}</h5>
                </div>
                
                  <div className={deckview["card-row"]}>
                    <h4>Back:</h4>
                    <div className={deckview["card-content"]}>{card.back}</div>
                  </div>

                  <div className={deckview["card-row"]}>
                    <h4>Front:</h4>
                    <div className={deckview["card-content"]}>{card.front}</div>
                  </div>
                
                <div className={deckview["card-controls"]}>
                  <Link
                    className={deckview["deck-link"]}
                    to={`/decks/${deck.deck_id}/cards/${card.card_id}/edit`}
                  >
                    Edit
                  </Link>
                  <button
                    className={deckview["card-button"]}
                    onClick={async () => {
                      if (
                        window.confirm(
                          "Delete this card? You will not be able to recover it."
                        )
                      ) {
                        await deleteCard(card.card_id);
                        return window.location.reload(true);
                      }
                    }}
                  >
                    Delete Card
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
}

export default DeckView;

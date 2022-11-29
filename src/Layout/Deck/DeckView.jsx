import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import { deleteDeck } from "../../utils/api";
import deckview from "./deckview.module.css"
function DeckView({ deck, navigate }) {

  const handleDeleteDeck = async () => {
    const abortController = new AbortController()
    if(window.confirm("Delete this deck? \n\n You will not be able to recover it.")){
      await deleteDeck(deck.deck_id, abortController.signal)
      return navigate("/");
    }
  }

  return (
    <div className={deckview["view-deck-container"]}>
      <Breadcrumb deck={deck} />
      <div className={deckview["deck-info"]}>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <div className={deckview["deck-controls"]}>
          <Link className={deckview["deck-link"]} to={`/decks/${deck.deck_id}/edit`}>Edit</Link>
          <Link className={deckview["deck-link"]} to={`/decks/${deck.deck_id}/study`}>Study</Link>
          <Link className={deckview["deck-link"]} to={`/decks/${deck.deck_id}/cards/new`}>Cards</Link>
          <button onClick={handleDeleteDeck}>Delete Deck</button>
        </div>
      </div>
      {Object.keys(deck).length ? (
        deck.cards.map((card) => {
          const [side, setSide] = useState(false);
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
                {side ? (
                  <div>
                    <h4>Back:</h4>
                    <div className={deckview["card-content"]}>{card.back}</div>
                  </div>
                ) : (
                  <div>
                    <h4>Front:</h4>
                    <div className={deckview["card-content"]}>{card.front}</div>
                  </div>
                )}
                
              </div>
              <div className={deckview["card-row"]}>
              <button onClick={() => setSide(!side)}>Flip</button>
                <Link
                  to={`/decks/${deck.deck_id}/cards/${card.card_id}/edit`}
                />
                <button
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
        })
      ) : (
        <div>There are no cards in this deck yet.</div>
      )}
    </div>
  );
}

export default DeckView;

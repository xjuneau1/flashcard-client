import React from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "../../utils/api";
import decklist from "../Home/decklist.module.css";
function DeckList({ decks }) {
  const handleDeleteDeck = (event) => {
    const abortController = new AbortController();
    if (
      window.confirm("Delete this deck?\n\n You will not be able to recover it.")
    ) {
      deleteDeck(event.target.parentNode.parentNode.parentNode.id, abortController.signal);
      return window.location.reload(true);
    }
  };
  return (
    <div className={decklist["deck-container"]}>
      {decks.length ? (
        decks
          .map((deck) => {
            return (
              <div
                className={decklist["deck"]}
                key={deck.deck_id}
                id={deck.deck_id}
              >
                <div className={decklist["deck-body"]}>
                  <h5>No. of Cards: {deck.cards.length}</h5>
                  <h3>{deck.name}</h3>
                  <h4>Description:</h4>
                  <div className={decklist["deck-description"]}>
                    
                    <p>{deck.description}</p>
                  </div>
                  <div className={decklist["deck-buttons"]}>
                    <Link
                      className={decklist["deck-link"]}
                      to={`/decks/${deck.deck_id}`}
                    >
                      View
                    </Link>
                    <Link
                      className={decklist["deck-link"]}
                      to={`/decks/${deck.deck_id}/study`}
                    >
                      Study
                    </Link>

                    <button onClick={handleDeleteDeck}>Delete</button>
                  </div>
                </div>
              </div>
            );
          })
          .sort((a, b) => (a < b ? 1 : -1))
      ) : (
        <div>No Decks to show.</div>
      )}
    </div>
  );
}

export default DeckList;

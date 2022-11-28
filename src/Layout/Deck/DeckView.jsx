import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";

function DeckView({ deck }) {
  return (
    <div className="view-deck-container">
      <Breadcrumb deck={deck} />
      <div className="deck-info">
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <div className="deck-controls">
          <Link to={`/decks/${deck.deck_id}/edit`}>Edit</Link>
          <Link to={`/decks/${deck.deck_id}/study`}>Study</Link>
          <Link to={`/decks/${deck.deck_id}/cards/new`}>Cards</Link>
          <button>Delete Deck</button>
        </div>
      </div>
      {Object.keys(deck).length ? (
        deck.cards.map((card) => {
          const [side, setSide] = useState(false);
          return (
            <div
              className="card-container"
              key={card.card_id}
              id={card.card_id}
            >
              <div className="card-row">
                <h5>Card # {card.card_id}</h5>
              </div>
              <div className="card-row">
                {side ? (
                  <div>
                    <h4>Back</h4>
                    <div>{card.back}</div>
                  </div>
                ) : (
                  <div>
                    <h4>Front</h4>
                    <div>{card.front}</div>
                  </div>
                )}
                <button onClick={() => setSide(!side)}>Flip</button>
              </div>
              <div className="card-row">
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

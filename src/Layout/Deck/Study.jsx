import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import study from "./study.module.css";

function Study({ deck}) {
  const [card, setCard] = useState(0);
  const [side, setSide] = useState(true);
  const navigate = useNavigate();

  const handleChangeCard = () => {
    if (card === deck.cards.length - 1) {
      window.confirm("Reset the deck? \n\n Click 'cancel' to return home.")
        ? setCard(0)
        : navigate("/");
    } else {
      setCard(card + 1);
      setSide(!side);
    }
  };
  const changeSide = () => {
    setSide(!side);
  };
  if (Object.keys(deck).length) {
    if (deck.cards.length < 2) {
      return (
        <div className={study["study-container"]}>
          <div className={study["study-no-cards"]}>
            <h2>Not Enough Cards</h2>
            <p>
              You need at least 2 cards to study. There is {deck.cards.length}{" "}
              card(s) in this deck.
            </p>
            <Link className={study["study-add-link"]} to={`/decks/${deck.deck_id}/cards/new`}>Add Cards</Link>
          </div>
        </div>
      );
    }

    return (
      <div className={study["study-container"]}>
        <div className={study["study-name"]}>{deck.name}: Study</div>
        <div className={study["study-card"]}>
          <div className={study["study-card-subtitle"]}>
            Card {card + 1} of {deck.cards.length}
          </div>
          <div className={study["study-card-text"]}>
            {side ? deck.cards[card].front : deck.cards[card].back}
          </div>
          <button className={study["study-card-flip"]} onClick={changeSide}>
            Flip
          </button>
          {!side ? (
            <button
              className={study["study-card-flip"]}
              onClick={() => {
                handleChangeCard();
                changeSide();
              }}
            >
              Next
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Study;

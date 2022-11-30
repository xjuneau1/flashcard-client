import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Deck from "./Deck/Deck";
import CreateDeck from "./Deck/CreateDeck";
import Breadcrumb from "./Breadcrumb";
import layout from "./layout.module.css";
function Layout() {
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(null);
  const [pageName, setPageName] = useState("");
  return (
    <div className={layout["layout-container"]}>
      <Breadcrumb deck={deck} pageName={pageName} setPageName={setPageName} />
      <Routes>
        <Route path="/" element={<Home decks={decks} setDecks={setDecks} />} />
        <Route path="/decks/new" element={<CreateDeck decks={decks} />} />
        <Route
          path="/decks/:deck_id/*"
          element={
            <Deck
              deck={deck}
              setDeck={setDeck}
              error={error}
              setError={setError}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default Layout;

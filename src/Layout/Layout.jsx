import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Deck from "./Deck/Deck";
import CreateDeck from "./Deck/CreateDeck";
function Layout() {
  const [decks, setDecks] = useState([]);
  return (
    <Routes>
      <Route path="/" element={<Home decks={decks} setDecks={setDecks} />} />
      <Route path="/decks/new" element={<CreateDeck decks={decks} />} />
      <Route path="/decks/:deck_id/*" element={<Deck />} />
    </Routes>
  );
}

export default Layout;

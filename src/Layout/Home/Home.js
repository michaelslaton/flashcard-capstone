import DeckList from "./DeckList";
import { Link } from "react-router-dom";
import React from "react";

function Home({ decks, setDecks }) {
  return (
    <div>
      <div>
        <Link to="/decks/new"  className="btn btn-primary">Create Deck</Link>
      </div>
      <div style={{ marginBottom: 40 }}>
        <DeckList decks={decks} setDecks={setDecks} />
      </div>
    </div>
  );
}

export default Home;

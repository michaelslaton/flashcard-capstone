import { listDecks } from "../../utils/api";
import React, { useEffect } from "react";
import DeleteDeckButton from "../DeleteDeckButton";
import { Link } from "react-router-dom";

function DeckList({ decks, setDecks }) {
  
  useEffect(() => {
    listDecks().then(setDecks);
  }, [setDecks]);
  
  if(decks.length === 0){
    return <p>loading...</p>
  }

  const deckList = decks.map((deck, index) => {
    return (
      <div className="card w-75" style={{ marginTop: 10 }} key={index}>
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <p className="card-text">{deck.description}</p>
          <p className="card-text">{deck.cards.length} cards</p>
          <div className="d-flex justify-content-between">
            <div>
              <Link to={`/decks/${deck.id}`}>
                <input
                  className="btn btn-primary"
                  style={{ marginRight: "10px" }}
                  type="button"
                  value="View"
                />
              </Link>
              <Link to={`/decks/${deck.id}/study`}>
                <input
                  className="btn btn-primary"
                  style={{ marginRight: "10px" }}
                  type="button"
                  value="Study"
                />
              </Link>
            </div>
            <DeleteDeckButton deckId={deck.id} />
          </div>
        </div>
      </div>
    );
  });

  return <div>{deckList}</div>;
}

export default DeckList;

import React, { useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
import DeleteDeckButton from "../DeleteDeckButton";
import DeleteCardButton from "./Cards/DeleteCardButton";
import { readDeck } from "../../utils/api";
import { useParams, Link, useRouteMatch } from "react-router-dom";

export default function Deck() {
  const [deck, setDeck] = useState({ cards: [], name: ``, description: `` });
  const { deckId } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    readDeck(deckId).then((response) =>
      setDeck({
        cards: response.cards,
        name: response.name,
        description: response.description,
      })
    );
  }, []);

  const cardList = deck.cards.map((card, index) => {
    return (
      <div key={index} className="card w-50">
        <div className="row card-body justify-content-md-center">
          <div className="col-sm-6">
            <div>
              <p className="card-text">{`${card.front}`}</p>
            </div>
          </div>
          <div className="col-sm-6">
            <div>
              <p className="card-text">{`${card.back}`}</p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to={`${url}/cards/${card.id}/edit`}>
                  <input
                    type="button"
                    style={{ marginRight: "10px" }}
                    className="btn btn-primary"
                    value="Edit"
                  />
                </Link>
                <DeleteCardButton cardId={card.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div>
        <Breadcrumbs
          crumbs={[{ label: "Home", link: "/" }, { label: deck.name }]}
        />
      </div>
      <div>
        <h4>{`${deck.name}`}</h4>
        <div>{`${deck.description}`}</div>
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div className="d-flex justify-content-between">
            <div>
              <Link to={`${url}/edit`}>
                <input
                  type="button"
                  style={{ marginRight: "10px" }}
                  className="btn btn-primary"
                  value="Edit"
                />
              </Link>
              <Link to={`${url}/study`}>
                <input
                  type="button"
                  style={{ marginRight: "10px" }}
                  className="btn btn-primary"
                  value="Study"
                />
              </Link>
              <Link to={`${url}/cards/new`}>
                <input
                  type="button"
                  style={{ marginRight: "10px" }}
                  className="btn btn-primary"
                  value="Add Cards"
                />
              </Link>
            </div>
            <div>
              <DeleteDeckButton deckId={deckId} />
            </div>
          </div>
        </div>
        <div>
          <div>
            <h3>Cards</h3>
          </div>
          <div style={{ marginBottom: 40 }}>{cardList}</div>
        </div>
      </div>
    </div>
  );
}

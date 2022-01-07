import React, { useEffect, useState } from "react";
import { readDeck } from "../../utils/api";
import Breadcrumbs from "../Breadcrumbs";
import {
  useParams,
  useHistory,
  Link,
} from "react-router-dom";

function Study() {
  const history = useHistory();
  const [deck, setDeck] = useState({cards: [], name: ``});
  const [flip, setFlip] = useState(true);
  const [activeCard, setActiveCard] = useState(1)
  const { deckId } = useParams();

  useEffect(() => {
    readDeck(deckId)
    .then((response) => setDeck({cards: response.cards, name: response.name}));
  }, [activeCard]);

  if(deck.cards.length <= 2 || deck.cards.length === 0){
    return (
      <div>
        <div>
          <Breadcrumbs
            crumbs={[
              { label: "Home", link: "/" },
              { label: deck.name, link: `/decks/${deckId}` },
              { label: "Study" },
            ]}
          />
        </div>
        <h1>Study: {`${deck.name}`}</h1>
        <h2>Not enough cards.</h2>
        <p>You need at least 3 cards to study. There are {`${deck.cards.length}`} in this deck.</p>
          <Link to={`/decks/${deckId}/cards/new`}><input type="button" style ={{marginRight: "10px"}} className="btn btn-primary" value="+Add Cards"/></Link>
      </div>
    )
  };

  function handleFlip(){
      setFlip(!flip)
  };

  function handleNext(){
      setFlip(true)
      let current = activeCard;
      current+= 1;
      setActiveCard(current)
  };

  function handleReset(){
    if (window.confirm("Reset deck?\n\nClick 'cancel' to return to the home page.")){
      setActiveCard(1);
      setFlip(true);
    } else {
      history.push("/");
    }
  };

  function FlashCard(){
    const fronts = deck.cards.map((card) => {
      return card.front;
    })

    const backs = deck.cards.map((card) => {
      return card.back;
    })

    if(flip){
      return (
        <div>
          <div className="card w-50">
            <div className="card-body">
              <h5 className="card-title">Card {`${activeCard}`} of {`${backs.length}`}</h5>
              <p className="card-text">{`${fronts[activeCard - 1]}`}</p>
              <input type="button" onClick={handleFlip} className="btn btn-primary" value="Flip"/>
            </div>
          </div>
        </div>
      );
    } else if (!flip && activeCard === backs.length){
      return (
        <div>
          <div className="card w-50">
            <div className="card-body">
              <h5 className="card-title">Card {`${activeCard}`} of {`${backs.length}`}</h5>
              <p className="card-text">{`${backs[activeCard - 1]}`}</p>
              <input type="button" onClick={handleFlip} className="btn btn-secondary" style ={{marginRight: "10px"}} value="Flip"/>
              <input type="button" onClick={handleReset} className="btn btn-primary" value="Next"/>
            </div>
          </div>
        </div>
      )
    } else if(!flip){
      return (
        <div>
          <div className="card w-50">
            <div className="card-body">
              <h5 className="card-title">Card {`${activeCard}`} of {`${backs.length}`}</h5>
              <p className="card-text">{`${backs[activeCard - 1]}`}</p>
              <input type="button" onClick={handleFlip} className="btn btn-secondary" style ={{marginRight: "10px"}} value="Flip"/>
              <input type="button" onClick={handleNext} className="btn btn-primary" value="Next"/>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <div>
        <Breadcrumbs
          crumbs={[
            { label: "Home", link: "/" },
            { label: deck.name, link: `/decks/${deckId}` },
            { label: "Study" },
          ]}
        />
      </div>
      <h1>Study: {`${deck.name}`}</h1>
      <FlashCard/>
    </div>
  );
}

export default Study;

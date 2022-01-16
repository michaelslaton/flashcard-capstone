import React, { useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home/Home"
import Study from "./Study/Study"
import Deck from "./Deck/Deck";
import EditDeck from "./Deck/EditDeck";
import CreateDeck from "./Deck/CreateDeck";
import AddCard from "./Deck/Cards/AddCard";
import EditCard from "./Deck/Cards/EditCard";
import {
  Route,
  Switch,
} from "react-router-dom";

function Layout() {
  const [decks, setDecks] = useState([]);

  return (
    <div>
      <Header />
      <div className="container">
          <Switch>

            <Route exact={true} path="/">
              <Home decks={decks} setDecks={setDecks} />
            </Route>

            <Route exact path="/decks/new">
              <CreateDeck decks={decks} setDecks={setDecks}/>
            </Route>

            <Route exact path="/decks/:deckId">
              <Deck/>
            </Route>            

            <Route exact path="/decks/:deckId/edit">
              <EditDeck/>
            </Route>

            <Route exact path="/decks/:deckId/study">
              <Study/>
            </Route>

            <Route exact path="/decks/:deckId/cards/new">
              <AddCard/>
            </Route>

            <Route exact path="/decks/:deckId/cards/:cardId/edit">
              <EditCard/>
            </Route>

            <Route>
              <NotFound/>
            </Route>

          </Switch>
      </div>
    </div>
  );
}

export default Layout;

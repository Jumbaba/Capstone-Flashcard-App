import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage.js";
import NotFound from "./NotFound.js";
import CreateDeck from "../Decks/CreateDeck.js";
import ViewDeck from "../Decks/ViewDeck.js";
import EditDeck from "../Decks/EditDeck.js";
import Study from "../Study/Study.js";
import AddCard from "../Cards/AddCard.js";
import EditCard from "../Cards/EditCard.js";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        {/* TODO: Implement the screen starting here */}
      </div>
    </div>
  );
}

export default Layout;

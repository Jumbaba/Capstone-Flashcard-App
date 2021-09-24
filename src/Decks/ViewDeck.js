import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardList from "../Cards/CardList.js";
import SubHeader from "../Layout/SubHeader.js";

export default function ViewDeck() {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const { cards = [] } = deck;

  //Gets deck from API given deckId
  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDeck() {
      const deck = await readDeck(deckId, abortController.signal);
      setDeck(deck);
    }
    fetchDeck();
  }, [deckId]);

  //The View Deck page
  return (
    <React.Fragment>
      <SubHeader breadCrumbText={deck.name} />
      <div>
        <div className="container">
          <h3 className="row">{deck.name}</h3>
          <p>{cards.length} cards</p>
          <p className="row">{deck.description}</p>
        </div>
        <Link to={`/decks/${deckId}/edit`}>
          <button type="button" className="oi oi-pencil mr-2 btn btn-secondary">
            {" "}
            Edit
          </button>
        </Link>
        <Link to={`/decks/${deckId}/study`}>
          <button type="button" className="oi oi-book mr-2 btn btn-primary">
            {" "}
            Study
          </button>
        </Link>
        <Link to={`/decks/${deckId}/cards/new`}>
          <button type="button" className="oi oi-plus mr-2 btn btn-primary">
            {" "}
            Add Cards
          </button>
        </Link>
        <div className="mt-2">
          <h2>Cards</h2>
        </div>
        <CardList cards={cards} deckId={deckId} />
      </div>
    </React.Fragment>
  );
}

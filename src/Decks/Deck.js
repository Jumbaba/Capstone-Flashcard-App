import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index.js";

export default function Deck({ deck, setDecks }) {
  const history = useHistory();

  //Will display delete deck confirmation window after clicking delete button
  const handleDelete = async () => {
    const ac = new AbortController();
    const result = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it"
    );
    //If the user hits ok then the deck will delete otherwise they will be sent to the home page
    if (result) {
      await deleteDeck(deck.id, ac.signal);
      const data = await listDecks(ac.signal);
      setDecks(data);
      history.push("/");
    }
  };

  //The deck render
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">{deck.name}</div>
        <div>{deck.cards.length} cards</div>
        <div className="card-text">{deck.description}</div>
        <Link to={`/decks/${deck.id}`}>
          <button type="button" className="oi oi-eye mr-2 btn btn-secondary">
            {" "}
            View
          </button>
        </Link>
        <Link to={`/decks/${deck.id}/study`}>
          <button type="button" className="oi oi-book mr-2 btn btn-primary">
            {" "}
            Study
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            className="float-right oi oi-trash btn btn-danger"
            onClick={handleDelete}
          ></button>
        </Link>
      </div>
    </div>
  );
}

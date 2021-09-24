import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteCard } from "../utils/api/index.js";

export default function Card({ card, deckId }) {
  const history = useHistory();

  //After clicking delete button, user will be prompted with delete card confirmation window
  const handleDelete = async () => {
    const ac = new AbortController();
    const result = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it"
    );
    //If user clicks ok, then the card is deleted otherwise they will be returned to the view deck page
    if (result) {
      await deleteCard(card.id, ac.signal);
      history.push(`/decks/${deckId}`);
    }
  };

  //The flashcard render
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">{card.name}</div>
        <div className="card-text">{card.front}</div>
        <div className="card-text">{card.back}</div>
        <Link to="/">
          <button
            type="button"
            className="float-right oi oi-trash ml-2 btn btn-danger"
            onClick={handleDelete}
          ></button>
        </Link>
        <Link to={`${deckId}/cards/${card.id}/edit`}>
          <button
            type="button"
            className="float-right oi oi-pencil ml-2 btn btn-primary"
          >
            {" "}
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
}

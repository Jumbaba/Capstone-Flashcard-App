import React from "react";
import { Link, useParams } from "react-router-dom";

export default function NotEnoughCards({cards}) {
  const { deckId } = useParams();

  //Separate render just for if deck is too small
  return (
    <div>
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to study, There are {cards.length} in this
        deck.
      </p>
      <Link to={`/decks/${deckId}/cards/new`}>
        <button className="btn btn-primary">
          <span className="oi oi-plus mr-2"></span>
          Add Cards
        </button>
      </Link>
    </div>
  );
}

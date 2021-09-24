import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NotEnoughCards from "./NotEnoughCards.js";

export default function FormatStudyCards({ cards = [] }) {
  let [card, setCard] = useState(0);
  let [cardFlip, setCardFlip] = useState(false);
  const history = useHistory();

  //Sets flip state to its current opposite
  const handleFlip = () => {
    setCardFlip(!cardFlip);
  };

  //Resets the current flip state before moving to next flash card
  const handleNext = () => {
    setCardFlip(false);
    //Asks user if they want to go through the deck again when they reach the end
    if (card + 1 === cards.length) {
      if (window.confirm("Restart cards?")) setCard(0);
      else history.push("/");
    } else {
      setCard((card = card + 1));
    }
  };
  
  //Check to see if the deck is too small
  if (cards.length < 3) return <NotEnoughCards cards={cards} />;

  //The study page render
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          Card {card + 1} of {cards.length}
        </div>
        {cardFlip ? (
          <div className="card-text">{cards[card].back}</div>
        ) : (
          <div className="card-text">{cards[card].front}</div>
        )}
        <button type="button" className="btn btn-secondary mr-2" onClick={handleFlip}>
          Flip
        </button>
        {cardFlip ? (
          <button type="button" className="btn btn-primary mr-2" onClick={handleNext}>
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
}

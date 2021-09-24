import React from "react";
import Card from "./Card.js";

export default function CardList({ cards, deckId }) {
  //Intermediate step to break down cards into individual objects to shove into Card component
  const mapCards = cards.map((card, index) => (
    <Card key={index} card={card} deckId={deckId} />
  ));

  return mapCards;
}

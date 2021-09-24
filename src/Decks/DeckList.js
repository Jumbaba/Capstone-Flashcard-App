import React from "react";
import Deck from "./Deck.js";

export default function DeckList({ decks, setDecks }) {
  //Mapping through the decks prop to get an array of the decks to make it easier for Deck component
  const mapDecks = decks.map((deck, index) => (
    <Deck key={index} deck={deck} setDecks={setDecks} />
  ));

  return <div className="col">{mapDecks}</div>;
}

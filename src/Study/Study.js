import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import FormatStudyCards from "./FormatStudyCards.js";
import SubHeader from "../Layout/SubHeader.js";

export default function Study() {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  //Gets deck from API given deckId
  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDeck() {
      const deck = await readDeck(deckId, abortController.signal);
      setDeck(deck);
    }
    fetchDeck();
  }, [deckId]);

  //Calls SubHeader and FormatStudyCards to make the actual Study page
  return (
    <React.Fragment>
      <SubHeader deck={deck} breadCrumbText="Study"></SubHeader>
      <div className="container">
        <div className="col">
          <h1>Study: {deck.name}</h1>
          <FormatStudyCards cards={deck.cards} />
        </div>
      </div>
    </React.Fragment>
  );
}

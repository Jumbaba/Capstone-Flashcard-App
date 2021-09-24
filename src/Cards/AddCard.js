import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm.js";
import SubHeader from "../Layout/SubHeader.js";

export default function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

  //Will find deck from API given deckId and change deck state accordingly
  useEffect(() => {
    const abortController = new AbortController();
    async function getDeck() {
      const data = await readDeck(deckId, abortController.signal);
      setDeck(data);
    }
    getDeck();
  }, [deckId]);

  //Will create card for current deck given the front and back content values
  function addCard(front, back) {
    const ac = new AbortController();
    createCard(deckId, { front, back }, ac.signal);
  }

  //CardForm is being called with addCard as its onSuccess function
  return (
    <React.Fragment>
      <SubHeader deck={deck} breadCrumbText="Add Card" />
      <div className="container">
        <CardForm
          deck={deck}
          formData={formData}
          setFormData={setFormData}
          isNew={true}
          onSuccess={addCard}
        />
      </div>
    </React.Fragment>
  );
}

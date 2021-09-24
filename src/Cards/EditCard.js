import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateCard, readCard, readDeck } from "../utils/api/index.js";
import CardForm from "./CardForm.js";
import SubHeader from "../Layout/SubHeader.js";

export default function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({});

  //Sets deck state to deck with matching deckId from API
  useEffect(() => {
    const ac = new AbortController();
    async function getDeck() {
      const deckData = await readDeck(deckId, ac.signal);
      setDeck(deckData);
    }
    getDeck();
  }, [deckId]);

  //Sets formData to whatever is currently on the card
  useEffect(() => {
    const ac = new AbortController();
    async function getCard() {
      const cardData = await readCard(cardId, ac.signal);
      setFormData({ ...cardData });
    }
    getCard();
  }, [deckId, cardId]);

  //Updates card on API with new front and back
  function editCard(front, back) {
    const card = {
      id: formData.id,
      deckId: formData.id,
      front: front,
      back: back,
    };
    const ac = new AbortController();
    return updateCard(card, ac.signal);
  }

  return (
    <React.Fragment>
      <SubHeader deck={deck} breadCrumbText={`Edit Card ${cardId}`} />
      <div>
        <CardForm
          deck={deck}
          formData={formData}
          setFormData={setFormData}
          isNew={false}
          onSuccess={editCard}
        />
      </div>
    </React.Fragment>
  );
}

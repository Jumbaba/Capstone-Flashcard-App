import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import SubHeader from "../Layout/SubHeader.js";

export default function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const initalFormData = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initalFormData });

  //Changes deck state given deck with deckId from API
  //Changes formData to current deck name and description
  useEffect(() => {
    const ac = new AbortController();
    async function getDeck() {
      const deck = await readDeck(deckId, ac.signal);
      setDeck(deck);
      setFormData({
        name: deck.name,
        description: deck.description,
      });
    }
    getDeck();
  }, [deckId]);

  //Keeps track of what the user is changing in the form
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  //If the user decides to cancel, then send them to the view deck page
  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  //On submit, updates deck given formData and returns user to view deck page
  const handleSubmit = (event) => {
    event.preventDefault();
    deck.name = formData.name;
    deck.description = formData.description;
    const abortController = new AbortController();
    async function updatedDeck() {
      await updateDeck(deck, abortController.signal);
      setDeck(deck);
    }
    updatedDeck();
    history.push(`/decks/${deckId}`);
  };

  //The Edit Deck form
  return (
    <React.Fragment>
      <SubHeader deck={deck} breadCrumbText="Edit Deck"></SubHeader>
      <h2>Edit Deck</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <textarea
            className="form-control"
            id="name"
            name="name"
            rows="3"
            onChange={handleChange}
            value={formData.name}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
        </div>
        <button className="btn btn-secondary mr-2" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-primary mr-2" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import SubHeader from "../Layout/SubHeader.js";

export default function CreateDeck() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  //Once you hit the submit button, this will create a new deck in the local api using the formData
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function addDeck() {
      const newDeck = await createDeck(formData, abortController.signal);
      setFormData({
        name: "",
        description: "",
      });
      history.push(`/decks/${newDeck.id}`);
    }
    addDeck();
  };

  //Sends user back to home page if they cancel the form
  const handleCancel = () => {
    history.push("/");
  };

  //Keeps track of what is being written in the form
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  //The Create Deck form
  return (
    <React.Fragment>
      <SubHeader breadCrumbText="Create Deck"></SubHeader>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            id="name"
            name="name"
            rows="3"
            placeholder="Deck Name"
            onChange={handleChange}
            value={formData.name}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            placeholder="Brief description of the deck"
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

import React from "react";
import { useHistory } from "react-router-dom";

export default function CardForm({
  formData,
  setFormData,
  isNew,
  onSuccess,
  deck,
}) {
  const history = useHistory();

  //Will send the user back to the view deck page
  const handleRedirect = () => {
    return history.push(`/decks/${deck.id}`);
  };

  //Will execute given onSuccess function and do different things depending on whether card isNew or not.
  //If card isNew then reset the formData and keep them on the same page
  //If card !isNew then change the formData and send them to the view deck page
  async function handleSubmit(event) {
    event.preventDefault();
    await onSuccess(formData.front, formData.back);
    isNew
      ? setFormData({
          front: "",
          back: "",
        })
      : setFormData({ ...formData });
    return isNew
      ? history.push(`/decks/${deck.id}/cards/new`)
      : history.push(`/decks/${deck.id}`);
  }

  //Keeps track of what user is changing in the form
  function handleInputChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  //The card form render which changes on whether card isNew
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>{isNew ? `${deck.name}: Add Card` : "Edit Card"}</h2>
      </div>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          className="form-control"
          value={formData.front}
          onChange={handleInputChange}
          placeholder={isNew ? "Front side of card" : null}
          name="front"
          id="front"
          rows="3"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          className="form-control"
          value={formData.back}
          onChange={handleInputChange}
          placeholder={isNew ? "Back side of card" : null}
          name="back"
          id="back"
          rows="3"
        ></textarea>
      </div>
      <div>
        <button
          className="btn btn-secondary mr-2"
          type="button"
          onClick={handleRedirect}
        >
          {isNew ? "Done" : "Cancel"}
        </button>
        <button className="btn btn-primary mr-2" type="submit">
          {isNew ? "Save" : "Submit"}
        </button>
      </div>
    </form>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function SubHeader({ deck = {}, breadCrumbText }) {
  const { id, name } = deck;

  //Breadcrumb that will change links and text based on where it is placed
  return (
    <ul className="breadcrumb">
      <li className="breadcrumb-item active">
        <Link to="/">Home</Link>
      </li>
      {name ? (
        <li className="breadcrumb-item">
          <Link to={`/decks/${id}`}>{name}</Link>
        </li>
      ) : null}
      {breadCrumbText ? (
        <li className="breadcrumb-item">{breadCrumbText}</li>
      ) : null}
    </ul>
  );
}

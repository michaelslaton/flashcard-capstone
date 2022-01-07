import React from "react";
import { Link } from "react-router-dom";

export default function DeckForm({
  deckId,
  submit,
  change,
  edit = false,
  placeholder1,
  placeholder2,
  name,
  description,
  button1,
  button2,
}) {
  if (edit === false) {
    return (
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={change}
            name="name"
            placeholder={placeholder1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            onChange={change}
            name="description"
            placeholder={placeholder2}
          />
        </div>
        <Link to={`/`}>
          <button type="button" style={{ marginRight: "10px" }} className="btn btn-secondary">
            {button1}
          </button>
        </Link>
        <button type="submit" className="btn btn-primary">
          {button2}
        </button>
      </form>
    );
  } else {
    return (
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={change}
            name="name"
            value={name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            onChange={change}
            name="description"
            value={description}
          />
        </div>
        <Link to={`/decks/${deckId}`}>
          <button type="button" style={{ marginRight: "10px" }} className="btn btn-secondary">
            {button1}
          </button>
        </Link>
        <button type="submit" className="btn btn-primary">
          {button2}
        </button>
      </form>
    );
  }
}

import React from "react";
import { Link } from "react-router-dom";

export default function CardForm({
  deckId,
  submit,
  change,
  edit = false,
  front,
  back,
  placeholder1,
  placeholder2,
  button1,
  button2,
}) {
  if (edit === false) {
    return (
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="front">Front:</label>
          <textarea
            className="form-control"
            id="front"
            onChange={change}
            name="front"
            placeholder={placeholder1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back:</label>
          <textarea
            className="form-control"
            id="back"
            onChange={change}
            name="back"
            placeholder={placeholder2}
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
  } else {
    return (
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <textarea
            className="form-control"
            id="front"
            onChange={change}
            name="front"
            value={front}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="back"
            onChange={change}
            name="back"
            value={back}
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

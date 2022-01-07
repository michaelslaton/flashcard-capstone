import React from "react";
import { deleteDeck } from "../utils/api";
import { useHistory } from "react-router-dom";

export default function DeleteDeckButton({ deckId }) {
  const history = useHistory();

  function handleClick() {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      deleteDeck(deckId);
      history.push("/");
      window.location.reload();
    }
  }

  return (
    <div>
      <input
        className="btn btn-danger"
        type="button"
        onClick={handleClick}
        value="Delete"
      />
    </div>
  );
}
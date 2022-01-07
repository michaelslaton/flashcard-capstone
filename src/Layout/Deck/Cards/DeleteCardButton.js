import React from "react";
import { deleteCard } from "../../../utils/api";

export default function DeleteCardButton({ cardId }) {
  async function handleClick() {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      await deleteCard(cardId);
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

import React, { useState, useEffect } from "react";
import Breadcrumbs from "../Breadcrumbs";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import { listDecks } from "../../utils/api";
import DeckForm from "./DeckForm";

export default function CreateDeck({ decks, setDecks }) {
  const history = useHistory();
  const initialFormState = { name: "", description: "" };
  const [formData, setFormData] = useState({ ...initialFormState });

  useEffect(() => {
    listDecks().then(setDecks);
  }, []);

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await createDeck(formData);
    setFormData({ ...initialFormState });
    history.push(`/decks/${decks.length + 1}`);
  }

  return (
    <div>
      <div>
        <Breadcrumbs
          crumbs={[{ label: "Home", link: "/" }, { label: "Create Deck" }]}
        />
      </div>
      <div>
        <h1>Create Deck</h1>
      </div>
      <div>
        <DeckForm
          submit={handleSubmit}
          change={handleChange}
          edit={false}
          placeholder1={`Deck Name`}
          placeholder2={`Brief description of the deck`}
          button1={`Cancel`}
          button2={`Submit`}
        />
      </div>
    </div>
  );
}

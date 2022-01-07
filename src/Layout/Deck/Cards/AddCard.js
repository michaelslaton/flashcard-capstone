import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../Breadcrumbs";
import { useParams } from "react-router-dom";
import { readDeck, createCard } from "../../../utils/api";
import CardForm from "./CardForm";

export default function AddCard() {
  const { deckId } = useParams();
  const initialFormState = { back: ``, front: ``, deckId: deckId };
  const [formData, setFormData] = useState({ ...initialFormState });
  const [deck, setDeck] = useState({ name: `` });

  useEffect(() => {
    readDeck(deckId).then((response) => {
      setDeck({ name: response.name, id: response.id });
    });
  }, []);

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  async function handleSave(event) {
    event.preventDefault();
    await createCard(deckId, formData);
    setFormData({ ...initialFormState });
    window.location.reload();
  }

  return (
    <div>
      <div>
        <Breadcrumbs
          crumbs={[
            { label: "Home", link: "/" },
            { label: deck.name, link: `/decks/${deckId}` },
            { label: "Add Card" },
          ]}
        />
      </div>
      <div>
        <h1>{`${deck.name}`}: Add Card</h1>
      </div>
      <div>
        <CardForm
        deckId={deckId}
        submit={handleSave}
        change={handleChange}
        edit={false}
        placeholder1={`Front side of card`}
        placeholder2={`Back side of card`}
        button1={`Done`}
        button2={`Save`}
        />
      </div>
    </div>
  );
}

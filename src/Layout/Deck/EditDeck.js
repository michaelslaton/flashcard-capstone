import React, { useState, useEffect } from "react";
import Breadcrumbs from "../Breadcrumbs";
import { useHistory, useParams } from "react-router-dom";
import { updateDeck } from "../../utils/api";
import { readDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

export default function EditDeck() {
  const history = useHistory();
  const initialFormState = { cards: [], name: ``, description: `` };
  const [formData, setFormData] = useState({ ...initialFormState });
  const { deckId } = useParams();

  useEffect(() => {
    readDeck(deckId).then((response) => {
      setFormData({
        cards: response.cards,
        id: response.id,
        name: response.name,
        description: response.description,
      });
    });
  }, [deckId]);

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await updateDeck(formData);
    console.log(formData);
    setFormData({ ...initialFormState });
    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <div>
        <Breadcrumbs
          crumbs={[
            { label: "Home", link: "/" },
            { label: formData.name, link: `/decks/${deckId}` },
            { label: "Edit Deck" },
          ]}
        />
      </div>
      <div>
        <h1>Edit Deck</h1>
      </div>
      <div>
        <DeckForm
          deckId={deckId}
          submit={handleSubmit}
          change={handleChange}
          edit={true}
          name={formData.name}
          description={formData.description}
          button1={`Cancel`}
          button2={`Submit`}
        />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../Breadcrumbs";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../../utils/api";
import CardForm from "./CardForm";

export default function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const initialFormState = { back: ``, front: ``, id: ``, deckId: `` };
  const [formData, setFormData] = useState({ ...initialFormState });
  const [deck, setDeck] = useState({ name: `` });

  useEffect(() => {
    readDeck(deckId).then((response) => {
      setDeck({ name: response.name, id: response.id });
    });
    readCard(cardId).then((response) => {
      setFormData({
        back: response.back,
        front: response.front,
        id: response.id,
        deckId: response.deckId,
      });
    });
  }, []);

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await updateCard(formData);
    setFormData({ ...initialFormState });
    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <div>
        <Breadcrumbs
          crumbs={[
            { label: "Home", link: "/" },
            { label: deck.name, link: `/decks/${deckId}` },
            { label: `Edit Card  ${cardId}` },
          ]}
        />
      </div>
      <div>
        <h1>Edit Card</h1>
      </div>
      <div>
        <CardForm
          deckId={deckId}
          submit={handleSubmit}
          change={handleChange}
          edit={true}
          front={formData.front}
          back={formData.back}
          button1={`Cancel`}
          button2={`Submit`}
        />
      </div>
    </div>
  );
}


const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000"

const headers = new Headers()
headers.append("Content-Type", "application/json")

async function fetchJson(url, options, onCancel) {
    try {
      const response = await fetch(url, options);
      if (response.status < 200 || response.status > 399) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
  
      if (response.status === 204) {
        return null;
      }
  
      return await response.json();
  
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error.stack);
        throw error;
      }
      return Promise.resolve(onCancel);
    }
  }

export async function listDecks(signal){
    const url = `${BASE_URL}/decks`
    return await fetchJson(url, {headers, signal}, [])
}

export async function deleteDeck(deck_id, signal){
  const url = `${BASE_URL}/decks/${deck_id}`
  const options = {method: "DELETE", signal}
  return await fetchJson(url, options)
}

export async function readDeck(deck_id, signal){
  const url = `${BASE_URL}/decks/${deck_id}`
  return await fetchJson(url, {signal}, {})
}

export async function createDeck(deck, signal){
  const url = `${BASE_URL}/decks`
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(deck),
    signal
  }
  return await fetchJson(url, options, {})
}

export async function updateDeck(deck_id, updatedDeck, signal){
  const url = `${BASE_URL}/decks/${deck_id}`
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify(updatedDeck),
    signal
  }
  return await fetchJson(url, options, {})
}

export async function readCard(card_id, signal){
  const url = `${BASE_URL}/cards/${card_id}`
  return await fetchJson(url, { signal }, {})
}

export async function createCard(deck_id, card, signal){
  const url = `${BASE_URL}/cards`
  card.deck_id = Number(deck_id)
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(card),
    signal
  }
  return await fetchJson(url, options, {})
}

export async function updateCard(card_id, updatedCard, signal){
  const url = `${BASE_URL}/cards/${card_id}`
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify(updatedCard),
    signal
  }
  return await fetchJson(url, options, {})
}

export async function deleteCard(card_id, signal){
  const url = `${BASE_URL}/cards/${card_id}`
  const options = {
    method: "DELETE",
    signal
  }
  return await fetchJson(url, options, )
}


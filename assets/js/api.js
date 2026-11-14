const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";

/**
 * @typedef {Object} Flashcard
 * @property {string} question
 * @property {string} answer
 */

/**
 * @typedef {Object} Deck
 * @property {string} _id
 * @property {string} name
 * @property {string} color
 * @property {Flashcard[]} cards
 */

/**
 * @typedef {Object} NewDeckData
 * @property {string} name
 * @property {string} color
 * @property {Flashcard[]} cards
 */

/**
 * Parses a successful HTTP response as JSON or rejects with its status.
 *
 * @param {Response} res - The response returned by fetch.
 * @returns {Promise<unknown>} The parsed response body.
 */
function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

/**
 * Fetches all decks for the current user.
 *
 * @returns {Promise<Deck[]>} The user's decks.
 */
function getDecks() {
  return fetch(`${baseUrl}/decks`, { headers }).then(processResponse);
    
}

const headers = {
  "Content-Type": "application/json",
  Authorization: "01a1d0fa-f9f0-7078-90a5-1a2b1be94935",
};

/**
 * Deletes a deck by its identifier.
 *
 * @param {string} deckId - The identifier of the deck to delete.
 * @returns {Promise<unknown>} The parsed response body.
 */
function deleteDeck(deckId) {
        return fetch(`${baseUrl}/decks/${deckId}`, 
            { headers, method: "DELETE" }).then(processResponse);
}

/**
 * Creates a deck for the current user.
 *
 * @param {NewDeckData} deckData - The name, color, and cards for the new deck.
 * @returns {Promise<Deck>} The created deck.
 */
function addDeck(deckData) {
    return fetch(`${baseUrl}/decks`, {
        headers,
        method: "POST",
        body: JSON.stringify(deckData)
    }).then(processResponse);
}

export { getDecks, deleteDeck, addDeck };

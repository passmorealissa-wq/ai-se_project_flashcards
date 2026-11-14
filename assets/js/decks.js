let fetchedDecks = [];

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
 * Finds a fetched deck by its unique identifier.
 *
 * @param {string} deckId - The identifier of the deck to find.
 * @returns {Deck|undefined} The matching deck, or undefined if not found.
 */
function getDeckByID(deckId) {
  return fetchedDecks.find(
    /**
     * Checks whether a deck has the requested identifier.
     *
     * @param {Deck} deck - The deck to compare.
     * @returns {boolean} Whether the deck identifier matches.
     */
    (deck) => deck._id === deckId,
  );
}

export { getDeckByID, fetchedDecks };
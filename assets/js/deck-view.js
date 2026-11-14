import { hexToString } from "./colors.js";

import { fetchedDecks } from "./decks.js";

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
 * Renders a deck's title and flashcards in the deck view.
 *
 * @param {Deck} deck - The deck to display.
 * @returns {void}
 */
function renderDeckView(deck) {
  const homeSection = document.querySelector("#home");
  const deckViewSection = document.querySelector("#deck-view");
  const notFoundSection = document.querySelector("#not-found");
  const mainContent = document.querySelector(".page__main-content");
  const carouselSection = document.querySelector("#carousel");
  const newDeckViewSection = document.querySelector("#new-deck-view");
  const cardsListEl = deckViewSection.querySelector(".gallery__list");
  const cardTemplateEl = document.querySelector("#card-template");
  const deckTitleEl = deckViewSection.querySelector(".gallery__title");


  deckTitleEl.textContent = deck.name;
  deckViewSection.dataset.deckId = deck._id;
  cardsListEl.querySelectorAll(".card").forEach(
    /**
     * Removes a previously rendered flashcard.
     *
     * @param {Element} cardEl - The card element to remove.
     * @returns {void}
     */
    (cardEl) => cardEl.remove(),
  );

  const colorName = hexToString(deck.color);
  const colorClass = `card_color_${colorName}`;

  /**
   * Creates and appends a flashcard element for the supplied card data.
   *
   * @param {Flashcard} cardData - The flashcard to render.
   * @returns {void}
   */
  function renderCard(cardData) {
    const cardEl = createCard(cardData);
    cardsListEl.append(cardEl);
  }

    /**
     * Clones the flashcard template and configures its flip and delete actions.
     *
     * @param {Flashcard} cardData - The data displayed on the flashcard.
     * @returns {HTMLLIElement} The configured flashcard element.
     */
    function createCard(cardData) { 
    const cardFragment = cardTemplateEl.content.cloneNode(true);
    const cardEl = cardFragment.querySelector(".card");
    const titleEl = cardFragment.querySelector(".card__title");
    const flipButtonEl = cardFragment.querySelector(".card__flip-btn");
    const deleteButtonEl = cardFragment.querySelector(".card__delete-btn");
    let showingQuestion = true;

    titleEl.textContent = cardData.question;
    cardEl.classList.add(colorClass, "card_type_flashcard");

    flipButtonEl.addEventListener("click", /**
     * Toggles the card between its question and answer.
     *
     * @returns {void}
     */
    () => {
      showingQuestion = !showingQuestion;
      titleEl.textContent = showingQuestion ? cardData.question : cardData.answer;
      cardEl.classList.toggle("card_color_white", !showingQuestion);
    });
    deleteButtonEl.addEventListener(
      "click",
      /**
       * Removes this flashcard from the deck view.
       *
       * @returns {void}
       */
      () => cardEl.remove(),
    );

    return cardEl;
  };
   
      
    deck.cards.forEach(
      /**
       * Renders one flashcard in the deck view.
       *
       * @param {Flashcard} cardData - The flashcard data to render.
       * @returns {void}
       */
      function (cardData) {
      renderCard(cardData);
      },
    );
   
    
}

export { renderDeckView };

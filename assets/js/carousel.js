import { hexToString, removeColorClasses } from "./colors.js";

/**
 * @typedef {Object} Flashcard
 * @property {string} question
 * @property {string} answer
 */

/**
 * @typedef {Object} Deck
 * @property {string} name
 * @property {string} color
 * @property {Flashcard[]} cards
 */

/**
 * Renders an interactive flashcard carousel for a deck.
 *
 * @param {Deck} deck - The deck whose cards appear in the carousel.
 * @returns {void}
 */
function renderCarouselView(deck) {
   

  let currentIndex = 0;
  let currentCard = deck.cards[currentIndex];
  let showingQuestion = true;

  const carouselEl = document.querySelector(".carousel");
  const leftBtn = carouselEl.querySelector(".carousel__btn_type_left");
  const rightBtn = carouselEl.querySelector(".carousel__btn_type_right");
  const carouselText = carouselEl.querySelector(".carousel__card-text");
  const sectionTitleEl = carouselEl.querySelector(".carousel__title");
  const cardEl = carouselEl.querySelector(".carousel__card");
  const flipBtn = carouselEl.querySelector(".carousel__btn_type_flip");


  /**
   * Disables a carousel navigation button.
   *
   * @param {HTMLButtonElement} buttonEl - The button to disable.
   * @returns {void}
   */
  function disableButton(buttonEl) {
    buttonEl.classList.add("carousel__btn_disabled");
    buttonEl.disabled = true;
  }

  /**
   * Enables a carousel navigation button.
   *
   * @param {HTMLButtonElement} buttonEl - The button to enable.
   * @returns {void}
   */
  function enableButton(buttonEl) {
    buttonEl.classList.remove("carousel__btn_disabled");
    buttonEl.removeAttribute("disabled");
  }

  /**
   * Updates the disabled state of the carousel navigation arrows.
   *
   * @returns {void}
   */
  function updateArrows() {
    if (currentIndex === 0) {
      disableButton(leftBtn);
    } else {
      enableButton(leftBtn);
    }

    if (currentIndex === deck.cards.length - 1) {
      disableButton(rightBtn);
    } else {
      enableButton(rightBtn);
    }
  }

   /**
    * Builds the carousel heading with the deck name and current card position.
    *
    * @param {Deck} deck - The deck being practiced.
    * @param {number} currentIndex - The zero-based index of the displayed card.
    * @returns {string} The heading text.
    */
  function getCarouselTitleString(deck, currentIndex) {
return `${deck.name} · ${currentIndex + 1}/${deck.cards.length}`;
}

   /**
    * Refreshes the displayed question, deck color, and navigation state.
    *
    * @returns {void}
    */
   function updateDisplay() {
    currentCard = deck.cards[currentIndex];
    carouselText.textContent = currentCard.question;
    sectionTitleEl.textContent = getCarouselTitleString(deck, currentIndex);

    const colorName = hexToString(deck.color);   
    const colorClass = `card__carousel_color_${colorName}`; 
    removeColorClasses(cardEl);
    cardEl.classList.add(colorClass);
    updateArrows();
  }

  rightBtn.onclick = /**
   * Advances to the next card when one is available.
   *
   * @returns {void}
   */
  () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
      showingQuestion = true;
      updateDisplay();
    }
  };

  leftBtn.onclick = /**
   * Moves to the previous card when one is available.
   *
   * @returns {void}
   */
  () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingQuestion = true;
      updateDisplay();
    }
  };

  flipBtn.onclick = /**
   * Toggles the current carousel card between its question and answer.
   *
   * @returns {void}
   */
  () => {
    showingQuestion = !showingQuestion;
    if (showingQuestion === true) {
      carouselText.textContent = currentCard.question;
      cardEl.classList.remove("carousel__card_color_white");
      cardEl.classList.add(`card__carousel_color_${hexToString(deck.color)}`);
    } else {
      carouselText.textContent = currentCard.answer;
      removeColorClasses(cardEl);
      cardEl.classList.add("carousel__card_color_white");
    }
  };

  updateDisplay();


}

export { renderCarouselView };
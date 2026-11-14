import { getDeckByID, fetchedDecks } from "./decks.js";

import { hexToString } from "./colors.js";

import { renderCarouselView } from "./carousel.js";

import { renderDeckView } from "./deck-view.js";

import { disableSubmitBtn, showError } from "./new-deck-view.js";

import { getDecks, deleteDeck } from "./api.js";



const homeSection = document.querySelector("#home");
const deckViewSection = document.querySelector("#deck-view");
const notFoundSection = document.querySelector("#not-found");
const mainContent = document.querySelector(".page__main-content");
const carouselSection = document.querySelector("#carousel");
const pageEl = document.querySelector(".page");
const newDeckViewSection = document.querySelector("#new-deck-view");
const aboutSection = document.querySelector("#about");
const decksListEl = homeSection.querySelector(".gallery__list");
const deckTemplateEl = document.querySelector("#deck-template");
const practiceButtonEl = deckViewSection.querySelector(".gallery__practice-btn");
const newDeckButtonEl = document.querySelector("#home .gallery__new-card-btn");

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
 * Displays the home deck list and hides the other main views.
 *
 * @returns {void}
 */
function renderHomeView() {
  homeSection.style.display = "block";
  deckViewSection.style.display = "none";
  notFoundSection.style.display = "none";
  carouselSection.style.display = "none";
  newDeckViewSection.style.display = "none";
  aboutSection.style.display = "none";
  pageEl.classList.remove("page_no-mobile-bar");
  mainContent.classList.remove("page__main-content_location_carousel");
}

/**
 * Displays the form for creating a deck and hides the other main views.
 *
 * @returns {void}
 */
function renderNewDeckView() {
  newDeckViewSection.style.display = "block";
  homeSection.style.display = "none";
  deckViewSection.style.display = "none";
  carouselSection.style.display = "none";
  aboutSection.style.display = "none";
  notFoundSection.style.display = "none";
  mainContent.classList.remove("page__main-content_location_carousel");
  pageEl.classList.add("page_no-mobile-bar");
}

/**
 * Displays the About section and hides the other main views.
 *
 * @returns {void}
 */
function renderAboutView() {
 newDeckViewSection.style.display = "none";
  homeSection.style.display = "none";
  deckViewSection.style.display = "none";
  carouselSection.style.display = "none";
  aboutSection.style.display = "block";
  notFoundSection.style.display = "none";
  pageEl.classList.add("page_no-mobile-bar");
  mainContent.classList.remove("page__main-content_location_carousel");
}

/**
 * Displays the not-found section and hides the other main views.
 *
 * @returns {void}
 */
function renderNotFoundView() {
  homeSection.style.display = "none";
  deckViewSection.style.display = "none";
  aboutSection.style.display = "none";
  notFoundSection.style.display = "block";
  carouselSection.style.display = "none";
  newDeckViewSection.style.display = "none";
  
  mainContent.classList.remove("page__main-content_location_carousel");
}

/**
 * Renders the view selected by the current URL hash.
 *
 * @returns {void}
 */
function router() {
  const [route, deckID] = window.location.hash.slice(1).split("/");

  if (route === "" || route === "home") {
    renderHomeView();
    return;
  }

  if (route === "new-deck-view") {
    renderNewDeckView();
    disableSubmitBtn();
    return;
  }

  if (route === "about") {
    renderAboutView();
    return;
  }

  const deck = getDeckByID(deckID);
  if (!deck) {
    renderNotFoundView();
    return;
  }

  if (route === "deck") {
    homeSection.style.display = "none";
    deckViewSection.style.display = "block";
    notFoundSection.style.display = "none";
    carouselSection.style.display = "none";
    newDeckViewSection.style.display = "none";
    aboutSection.style.display = "none";
    pageEl.classList.remove("page_no-mobile-bar");
    mainContent.classList.remove("page__main-content_location_carousel");
    renderDeckView(deck);
    
  } else if (route === "carousel") {
    homeSection.style.display = "none";
    deckViewSection.style.display = "none";
    notFoundSection.style.display = "none";
    newDeckViewSection.style.display = "none";
    aboutSection.style.display = "none";
    carouselSection.style.display = "flex";
    carouselSection.scrollIntoView({ behavior: "smooth" });
    pageEl.classList.add("page_no-mobile-bar");
    mainContent.classList.add("page__main-content_location_carousel");
    renderCarouselView(deck);
    
  } else {
    pageEl.classList.add("page_no-mobile-bar");
    mainContent.classList.remove("page__main-content_location_carousel");
    renderNotFoundView();

  }
}

window.addEventListener("DOMContentLoaded", /**
 * Loads the deck list, caches the results, and routes to the current view.
 *
 * @returns {void}
 */
() => {
  getDecks()
  .then(
    /**
     * Renders the fetched decks and stores them for route lookup.
     *
     * @param {Deck[]} decks - The decks returned by the API.
     * @returns {void}
     */
    (decks) => {
    decks.forEach(renderDeckEl)
     fetchedDecks.push(...decks);
  })
  .catch(
    /**
     * Displays a request failure in the error modal.
     *
     * @param {unknown} err - The reason the request failed.
     * @returns {void}
     */
    (err) => {
    showError(err);
  })
  .finally(
    /**
     * Routes after the initial deck request has settled.
     *
     * @returns {void}
     */
    () => {
    router();
  })
});

window.addEventListener("hashchange", router);

practiceButtonEl.addEventListener("click", /**
 * Opens carousel practice for the deck currently being viewed.
 *
 * @returns {void}
 */
() => {
  const deckID = deckViewSection.dataset.deckId;
  if (deckID) {
    window.location.hash = `carousel/${deckID}`;
  }
});

newDeckButtonEl.addEventListener("click", /**
 * Navigates to the new-deck form.
 *
 * @returns {void}
 */
() => {
  window.location.hash = "new-deck-view";
});



/**
 * Creates a deck-list item element and configures its content and actions.
 *
 * @param {Deck} item - The deck to represent.
 * @returns {DocumentFragment} The cloned deck template with its content set.
 */
function createDeckEl(item) {
    const deckEl = deckTemplateEl.content.cloneNode(true);
    deckEl.querySelector(".card__title").textContent = item.name;
    deckEl.querySelector(".card__count").textContent = `${item.cards.length} cards`;
    
    const deleteBtnEl = deckEl.querySelector(".card__delete-btn");
    deleteBtnEl.addEventListener(
      "click",
      /**
       * Deletes this deck from the API and removes it from the view and cache.
       *
       * @returns {void}
       */
      () => {
      deleteDeck(item._id).then(
        /**
         * Removes the deleted deck from the page and the in-memory collection.
         *
         * @returns {void}
         */
        () => {
      deleteBtnEl.closest(".card").remove();
      const index = fetchedDecks.findIndex(
        /**
         * Checks whether a cached deck is the one being deleted.
         *
         * @param {Deck} deck - The cached deck to compare.
         * @returns {boolean} Whether the deck identifiers match.
         */
        (deck) => deck._id === item._id,
      );
      if (index !== -1) fetchedDecks.splice(index, 1);
      },
      );
    },
    );
    

    const deckLinkEl = deckEl.querySelector(".card__link");
    deckLinkEl.href = `#deck/${item._id}`;

    const colorName = hexToString(item.color);   
    const colorClass = `card_color_${colorName}`;
    const deckEl_colorName = deckEl.querySelector(".card");
    deckEl_colorName.classList.add(colorClass);

    
    return deckEl;
}

/**
 * Creates and appends a deck-list item for a deck.
 *
 * @param {Deck} item - The deck to render.
 * @returns {void}
 */
function renderDeckEl(item) {
 const deckEl = createDeckEl(item);
 decksListEl.append(deckEl);
}

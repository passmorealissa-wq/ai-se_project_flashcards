import { decks, getDeckByID } from "./decks.js";

import { hexToString } from "./colors.js";

import { renderCarouselView } from "./carousel.js";

import { renderDeckView } from "./deck-view.js";


const homeSection = document.querySelector("#home");
const deckViewSection = document.querySelector("#deck-view");
const notFoundSection = document.querySelector("#not-found");
const mainContent = document.querySelector(".page__main-content");
const carouselSection = document.querySelector("#carousel");

const decksListEl = homeSection.querySelector(".gallery__list");
const deckTemplateEl = document.querySelector("#deck-template");
const practiceButtonEl = deckViewSection.querySelector(".gallery__practice-btn");

function renderHomeView() {
  homeSection.style.display = "block";
  deckViewSection.style.display = "none";
  notFoundSection.style.display = "none";
  carouselSection.style.display = "none";
  mainContent.classList.remove("page__main-content_location_carousel");
}

function renderNotFoundView() {
  homeSection.style.display = "none";
  deckViewSection.style.display = "none";
  notFoundSection.style.display = "block";
  carouselSection.style.display = "none";
  mainContent.classList.remove("page__main-content_location_carousel");
}

function router() {
  const [route, deckID] = window.location.hash.slice(1).split("/");

  if (route === "" || route === "home") {
    renderHomeView();
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
    renderDeckView(deck);
  } else if (route === "carousel") {
    homeSection.style.display = "none";
    deckViewSection.style.display = "none";
    notFoundSection.style.display = "none";
    carouselSection.style.display = "flex";
    carouselSection.scrollIntoView({ behavior: "smooth" });
    renderCarouselView(deck);
    mainContent.classList.add("page__main-content_location_carousel");
  } else {
    renderNotFoundView();
  }
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);

practiceButtonEl.addEventListener("click", () => {
  const deckID = deckViewSection.dataset.deckId;
  if (deckID) {
    window.location.hash = `carousel/${deckID}`;
  }
});

function createDeckEl(item) {
    const deckEl = deckTemplateEl.content.cloneNode(true);
    deckEl.querySelector(".card__title").textContent = item.name;
    deckEl.querySelector(".card__count").textContent = `${item.cards.length} cards`;
    
    const deleteBtnEl = deckEl.querySelector(".card__delete-btn");
    deleteBtnEl.addEventListener("click", () => {
        deleteBtnEl.closest(".card").remove(); });

    const deckLinkEl = deckEl.querySelector(".card__link");
    deckLinkEl.href = `#deck/${item.id}`;

    const colorName = hexToString(item.color);   
    const colorClass = `card_color_${colorName}`;
    const deckEl_colorName = deckEl.querySelector(".card");
    deckEl_colorName.classList.add(colorClass);

    
    return deckEl;
}

function renderDeckEl(item) {
 const deckEl = createDeckEl(item);
 decksListEl.append(deckEl);
}

 decks.forEach(renderDeckEl);

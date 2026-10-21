import { decks, getDeckByID } from "./decks.js";

import { hexToString } from "./colors.js";

import { renderCarouselView } from "./carousel.js";


const homeSection = document.querySelector("#home");
const notFoundSection = document.querySelector("#not-found");
const mainContent = document.querySelector(".page__main-content");
const carouselSection = document.querySelector("#carousel");


const decksListEl = document.querySelector(".gallery__list");

const deckTemplateEl = document.querySelector("#deck-template");

function renderHomeView() {
  homeSection.style.display = "block";
  notFoundSection.style.display = "none";
  carouselSection.style.display = "none";
  mainContent.classList.remove("page__main-content_location_carousel");
}

function renderNotFoundView() {
  homeSection.style.display = "none";
  notFoundSection.style.display = "block";
  carouselSection.style.display = "none";
  mainContent.classList.remove("page__main-content_location_carousel");
}




function router() {
    const hash = window.location.hash.slice(1);
    if (hash === "home" || hash === "") {
        renderHomeView();
    } else if (hash.startsWith("carousel/")) {
        const deckID = hash.split("/")[1];
        const deck = getDeckByID(deckID);
        carouselSection.style.display = "flex";
        homeSection.style.display = "none";
        notFoundSection.style.display = "none";
    if (!deck) {
        renderNotFoundView();
    return;
   }
    carouselSection.scrollIntoView({ behavior: "smooth" });
        renderCarouselView(deck); 
        mainContent.classList.add("page__main-content_location_carousel");
    } else {
        renderNotFoundView();
    }
    
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);

function createDeckEl(item) {
    const deckEl = deckTemplateEl.content.cloneNode(true);
    deckEl.querySelector(".card__title").textContent = item.name;
    deckEl.querySelector(".card__count").textContent = `${item.cards.length} cards`;
    
    const deleteBtnEl = deckEl.querySelector(".card__delete-btn");
    deleteBtnEl.addEventListener("click", () => {
        deleteBtnEl.closest(".card").remove(); });

    const deckLinkEl = deckEl.querySelector(".card__link");
    deckLinkEl.href = `#carousel/${item.id}`;

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


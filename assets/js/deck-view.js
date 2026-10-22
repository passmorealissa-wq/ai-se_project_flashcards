import { hexToString } from "./colors.js";

function renderDeckView(deck) {
  const homeSection = document.querySelector("#home");
  const deckViewSection = document.querySelector("#deck-view");
  const notFoundSection = document.querySelector("#not-found");
  const mainContent = document.querySelector(".page__main-content");
  const carouselSection = document.querySelector("#carousel");
  const cardsListEl = deckViewSection.querySelector(".gallery__list");
  const cardTemplateEl = document.querySelector("#card-template");
  const deckTitleEl = deckViewSection.querySelector(".gallery__title");


  deckTitleEl.textContent = deck.name;
  deckViewSection.dataset.deckId = deck.id;
  cardsListEl.querySelectorAll(".card").forEach((cardEl) => cardEl.remove());

  const colorName = hexToString(deck.color);
  const colorClass = `card_color_${colorName}`;

  function renderCard(cardData) {
    const cardEl = createCard(cardData);
    cardsListEl.append(cardEl);
  }
    function createCard(cardData) { 
    const cardFragment = cardTemplateEl.content.cloneNode(true);
    const cardEl = cardFragment.querySelector(".card");
    const titleEl = cardFragment.querySelector(".card__title");
    const flipButtonEl = cardFragment.querySelector(".card__flip-btn");
    const deleteButtonEl = cardFragment.querySelector(".card__delete-btn");
    let showingQuestion = true;

    titleEl.textContent = cardData.question;
    cardEl.classList.add(colorClass, "card_type_flashcard");

    flipButtonEl.addEventListener("click", () => {
      showingQuestion = !showingQuestion;
      titleEl.textContent = showingQuestion ? cardData.question : cardData.answer;
      cardEl.classList.toggle("card_color_white", !showingQuestion);
    });
    deleteButtonEl.addEventListener("click", () => cardEl.remove());

    return cardEl;
  };
   
      
    deck.cards.forEach(function (cardData) {
      renderCard(cardData);
    })
   
    
}

export { renderDeckView };

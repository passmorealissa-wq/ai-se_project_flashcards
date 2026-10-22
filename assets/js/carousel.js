import { hexToString, removeColorClasses } from "./colors.js";

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


  function disableButton(buttonEl) {
    buttonEl.classList.add("carousel__btn_disabled");
    buttonEl.disabled = true;
  }
  function enableButton(buttonEl) {
    buttonEl.classList.remove("carousel__btn_disabled");
    buttonEl.removeAttribute("disabled");
  }

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

 function getCarouselTitleString(deck, currentIndex) {
return `${deck.name} · ${currentIndex + 1}/${deck.cards.length}`;
}

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

  rightBtn.onclick = () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
      showingQuestion = true;
      updateDisplay();
    }
  };

  leftBtn.onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingQuestion = true;
      updateDisplay();
    }
  };

  flipBtn.onclick = () => {
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
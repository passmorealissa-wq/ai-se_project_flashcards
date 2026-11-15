import { fetchedDecks } from "./decks.js";
import { addDeck } from "./api.js";

/**
 * @typedef {Object} CreatedDeck
 * @property {string} _id
 * @property {string} name
 * @property {string} color
 * @property {Array<{question: string, answer: string}>} cards
 */

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;
const formEl = document.querySelector("#new-deck-form");
const submitBtnEl = formEl.querySelector(".new-deck-view__submit-btn");
const textEl = formEl.querySelector(".new-deck-view__text");
const errorModalEl = document.querySelector("#error-modal");
const errorModalCloseBtnEl = errorModalEl.querySelector(".modal__close");
const errorModalMessageEl = errorModalEl.querySelector(".modal__error");

/**
 * Enables the new-deck form's submit button.
 *
 * @returns {void}
 */
export function disableSubmitBtn() {
    submitBtnEl.disabled = false;

}

errorModalCloseBtnEl.addEventListener("click", 
    
 /**
 * Closes the error modal.
 *
 * @returns {void}
 */
function() {
    errorModalEl.classList.remove("modal_visible");
});

/**
 * Displays an error message in the error modal.
 *
 * @param {*} message - The error value to display; textContent converts it to text.
 * @returns {void}
 */
function showError(message) {
    errorModalMessageEl.textContent = message;
    errorModalEl.classList.add("modal_visible");
}

/**
 * Validates a deck name against the permitted type and length.
 *
 * @param {*} name - The value to validate.
 * @returns {string|null} The valid name, or null if it is invalid.
 */
function validateName(name) {
  if (typeof name != "string" || name.length < 2 || name.length > 80) {
    return null;
  }
  return name;
}

/**
 * Parses JSON text, returning null when parsing fails.
 *
 * @param {string} jsonString - The JSON text to parse.
 * @returns {*} The parsed JSON value; null is returned for invalid JSON and
 * valid JSON whose value is null.
 */
function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (/** @type {SyntaxError} */ error) {
    return null;
  }
}


/**
 * Normalizes a hex color to lowercase with a leading "#" and uses the default
 * green for a missing or invalid value.
 *
 * @param {string|undefined} color - The hex color, with or without "#".
 * @returns {string} The normalized color or the default green.
 */
export function normalizeColor(color) {
if (!color) return "#64d583";
const hex = color.startsWith("#") ? color.slice(1) : color;
if (!HEX_DIGITS.test(hex)) return "#64d583";
return "#" + hex.toLowerCase();
}

formEl.addEventListener("submit", 
  
/**
 * Validates the new-deck form and submits the deck to the API.
 *
 * @param {SubmitEvent} e - The form submission event.
 * @returns {void}
 */
function(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    const jsonData = parseJSON(values["deck-text"]);
        if (jsonData === null) {
            showError("Invalid JSON in deck text.");
            return;
        }

    const name = validateName(jsonData.name);
        if (name === null) {
            showError("Deck name must be a string between 2 and 80 characters.");
            return;
        }
    
        if (!Array.isArray(jsonData.cards)) {
            showError("Deck cards must be an array.");
            return;
  }


    const color = normalizeColor(values["deck-color"]);

        if (jsonData.color) {
            if (normalizeColor(jsonData.color) !== color) {
                showError("Deck color in JSON does not match selected color.");
                return;
            }
        }

   /**
    * Adds the created deck to the local collection and opens its view.
    *
    * @param {CreatedDeck} newDeck - The deck returned by the API.
    * @returns {void}
    */

    addDeck({ color, name, cards: jsonData.cards })
    .then((newDeck) => {
    fetchedDecks.push(newDeck);
    window.location.hash = "deck/" + newDeck._id;
   })
    .catch((error) => {
      showError("Failed to add deck:" + error);
    },
    );
  });

export { showError };
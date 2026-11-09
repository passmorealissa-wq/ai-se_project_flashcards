
import { decks, getDeckByID } from "./decks.js";

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;
const formEl = document.querySelector("#new-deck-form");
const submitBtnEl = formEl.querySelector(".new-deck-view__submit-btn");
const textEl = formEl.querySelector(".new-deck-view__text");
const errorModalEl = document.querySelector("#error-modal");
const errorModalCloseBtnEl = errorModalEl.querySelector(".modal__close");
const errorModalMessageEl = errorModalEl.querySelector(".modal__error");

export function disableSubmitBtn() {
    submitBtnEl.disabled = false;

}

errorModalCloseBtnEl.addEventListener("click", function() {
    errorModalEl.classList.remove("modal_visible");
});

function showError(message) {
    errorModalMessageEl.textContent = message;
    errorModalEl.classList.add("modal_visible");
}

function validateName(name) {
  if (typeof name != "string" || name.length < 2 || name.length > 80) {
    return null;
  }
  return name;
}

function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

/**
* Converts a string to a URL-safe slug: lowercase with any run of
* non-alphanumeric characters replaced by a single hyphen, and no leading or
* trailing hyphens.
*
* @param {string} str
* @returns {string}
*/
  export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
* Returns a consistent lowercase hex color string with a leading "#".
* Accepts values with or without a leading "#". Returns "#64d583" as a
* fallback if the value is missing or not a valid 6-digit hex.
*
* @param {string|undefined} color
* @returns {string}
*/
export function normalizeColor(color) {
if (!color) return "#64d583";
const hex = color.startsWith("#") ? color.slice(1) : color;
if (!HEX_DIGITS.test(hex)) return "#64d583";
return "#" + hex.toLowerCase();
}

formEl.addEventListener("submit", function(e) {
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

    const slug = `${slugify(name)}-${Date.now()}`;
    
    decks.push({ id: slug, color, name, cards: jsonData.cards });
    window.location.hash = "deck/" + slug;

});
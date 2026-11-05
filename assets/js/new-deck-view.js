
import { decks, getDeckByID } from "./decks.js";

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;
const formEl = document.querySelector("#new-deck-form");
const submitBtnEl = formEl.querySelector(".new-deck-view__submit-btn");
const textEl = formEl.querySelector(".new-deck-view__text");

export function disableSubmitBtn() {
    submitBtnEl.disabled = false;

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
    console.log("submit fired");

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    const jsonData = JSON.parse(values["deck-text"]);
    const color = normalizeColor(values["deck-color"]);

    const slug = `${slugify(jsonData.name)}-${Date.now()}`;
    
    decks.push({ id: slug, color, name: jsonData.name, cards: jsonData.cards });
    window.location.hash = "deck/" + slug;

});
# Flashcard App

My first project in TripleTen's AI-Assisted Software Engineering program. It includes decks of flashcards, each of which can be viewed in a carousel.

## Features
* browse flashcard decks
* open deck view
* flip cards to see the answer
* responsive design
* fixed buttons within responsive design

## Technologies used
* HTML
* CSS
* JavaScript

## Updates Made in Part 4
* CSS files were organized based on BEM block and imported in index.css file
* Refactored 'deck' to 'card' and 'decks' to 'gallery'
* Created the deck-view section
* Utilized Copilot to modularize the deck-view JavaScript

## Updates Made in Part 5
* Implemented responsive design for the home view
* Implemented the fixed 'new-card' and 'practice' buttons
* Fixed the position of the footer for screens with a max-width of 400px
* Implemented the responsive design for the deck view and the carousel view
* Implemented card and button designs based on the Figma file provided

## Updates Made in Part 6 and 7
* A section with the ID new-deck-view was added
* The router() was updated to render new-deck-view for that hash
* A form was created to include the following:
    * A color picker feature
    * A card textarea to receive card text was created to receive JSON text
    * A "create the deck" submit button
* Implemented a responsive view at 400px or less
* Implemented a responsive form (valid information on the form creates a new deck)

## Updates Made in Part 8
* Added an error modal for the New Deck form
* Added a close button listener
* Removed the initial visibility class and placeholder error text from the HTML
* Added showError(message) to display validation errors
* Added a color consistency check: when the JSON included a string color

## Updates Made in Part 9
* Connected deck management to the remote API
* Added authenticated API requests to fetch, create, and delete decks, and displayed
* fetched decks in the app
* Cached decks in fetchedDecks
* Updated the New Deck form to save decks through the API
* Added error handling for failed requests
* Removed the unused hard-coded deck data and slugify function
* Added an About view with hash-based routing
* Documented all named functions with JSDoc
* Updated the README to reflect major changes


## Project Pitch Video

Check out this video (https://drive.google.com/file/d/1c62hcTHaGsTiX-7y-_blOVPEqEXMaeGe/view?usp=sharing), where I describe my project and some of the challenges I faced while building it.


## Deployed Site

Check out [Flash Cards] (https://passmorealissa-wq.github.io/ai-se_project_flashcards) on GitHub Pages.
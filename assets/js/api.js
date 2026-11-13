const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";

function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function getDecks() {
  return fetch(`${baseUrl}/decks`, { headers }).then(processResponse);
    
}

const headers = {
  "Content-Type": "application/json",
  Authorization: "01a1d0fa-f9f0-7078-90a5-1a2b1be94935",
};

export { getDecks };

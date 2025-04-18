const print = function(s) {
    console.log(s);
}

const startGame = function() {
    window.location.href = "game.html";
}

const backToTitle = function() {
    window.location.href = "title.html";
}

const arraysCombine = function(arr1, arr2) {
    let newArr = [];
    for(let i = 0; i < arr1.length; i++) {
        for(let j = 0; j < arr2.length; j++) {
            newArr.push([arr1[i], arr2[j]]);
        }
    }
    return newArr;
}

const generate52Deck = function() {
    const ranks = Array.from({length: 13}, (_, i) => i + 1);
    const suits = ['2664', '2665', '2666', '2667'];
    const jokers = [[2668, 1], [2668, 2]];
    let cards = arraysCombine(suits, ranks);
    cards = cards.concat(jokers);
    const text = JSON.stringify(cards);
    localStorage.setItem("cards", text);
    // return cards
}

// const getCard = function(deck) {
const getCard = function() {
    let deck = JSON.parse(localStorage.getItem("newDeck"));
    if(deck === null) {
        deck =  JSON.parse(localStorage.getItem("cards"));
    }
    // let deck = JSON.parse(deckInStorage);
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck[randomIndex];
    if (randomIndex > -1) { 
        deck.splice(randomIndex, 1);
    }
    const newDeck = deck;
    localStorage.setItem("newDeck", JSON.stringify(newDeck));
    return card;
}

const cardGrid = document.getElementById('cardGrid');
const cardDeck = document.querySelector('#cardsDeck');
let cards = [];
let shuffled = 0;

const createCard = function(content, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    card.innerText = '\\u'+content[0];
    card.innerText = "";
    card.classList.add('unflipped');
    card.classList.add('inDeck');
    card.onclick = () => flipCard(card, content);
    print(card);
    return card;
}

const flipCard = function(card, content) {
    if (!card.classList.contains('unflipped')) {
        card.classList.add('unflipped');
        card.innerText = "";
    } else {
        card.classList.remove('unflipped');
        let suit = "&#x" + content[0] + ";";
        let rank = content[1];
        card.innerHTML = suit + rank;
    }
}

const initDeck = function() {
    cards = JSON.parse(localStorage.getItem("cards"));
    if(cards === null) {
        generate52Deck();
    }
    localStorage.removeItem("newDeck");
    localStorage.removeItem("cardInDeck");

    let cardsInDeck = [];
    for(let i = 0; i < 10; i++) {
        let card = getCard();
        print(card);
        newDeck = JSON.parse(localStorage.getItem("newDeck"));
        cardsInDeck.push(card);
    }
    const text = JSON.stringify(cardsInDeck);
    localStorage.setItem("cardInDeck", text);
    renderCards();
    cards = [];
}



const shuffleAndDeal = function() {
    initDeck();

    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('move');
        }, index * 600);
        setTimeout(() => {
            card.classList.remove('inDeck');
        }, index * 660);
    });
    const dealButton = document.querySelector("#deal");
    const redealButton = document.querySelector("#redeal");
    if (dealButton.style.display === "none") {
        dealButton.style.display = "block";
        redealButton.style.display = "none";

      } else {
        dealButton.style.display = "none";
        redealButton.style.display = "block";
      }
}

const shuffleAndRedeal = function() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.remove('move');
            card.classList.add('inDeck');
            card.classList.add('unflipped');
            card.classList.add('moveBack');
        }, index * 100);
      });

    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.remove('move');
            card.classList.add('inDeck');
            card.classList.add('moveBack');
        }, index * 100);
      });
      
      const redealButton = document.querySelector("#redeal");
      const dealButton = document.querySelector("#deal");
      if (redealButton.style.display === "none") {
            redealButton.style.display = "block";
            dealButton.style.display = "none";
        } else {
            redealButton.style.display = "none";
            dealButton.style.display = "block";
        }
}

const moveCard = function() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('move');
        }, index * 300);
      });

}

const moveCardBack = function() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.remove('move');
            card.classList.add('moveBack');
        }, index * 300);
      });
}

const renderCards = function() {
    const cardsInDeck = JSON.parse(localStorage.getItem("cardInDeck"));
    cardDeck.innerHTML = "";
    cardsInDeck.forEach((content, index) => {
        const card = createCard(content, index);
        // let c = card;
        cardDeck.appendChild(card);
    });
}

const createDeck = function(card) {
    let deck = document.querySelector('.cards-deck');
    deck.appendChild(card);
}

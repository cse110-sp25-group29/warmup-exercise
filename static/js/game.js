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
    return cards
}

const getCard = function(deck) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck[randomIndex];
    deck.pop(card);
    const newDeck = deck;
    return [newDeck, card];
}

const cardGrid = document.getElementById('cardGrid');
let cards = [];
let shuffled = 0;

const createCard = function(content, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    print(content);
    card.innerText = '\\u'+content[0];
    card.innerText = "";
    card.classList.add('unflipped');
    card.onclick = () => flipCard(card, content);
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

const shuffleAndRedeal = function() {
    const deck = generate52Deck();
    let draw = getCard(deck);
    print(draw);
    let newDeck = draw[0];
    let card = draw[1];
    for(let i = 0; i < 10; i++) {
        draw = getCard(newDeck);
        newDeck = draw[0];
        card = draw[1];
        cards.push(card);
    }
    renderCards();
    cards = [];
}

const renderCards = function() {
    cardGrid.innerHTML = "";
    cards.forEach((content, index) => {
        print(content)
        print(index)
        const card = createCard(content, index);
        cardGrid.appendChild(card);
    });
}

const createDeck = function() {
    document.getElementsByClassName('cards-deck');

}

const allCards = [
    'static/cards/PNG-cards-1.3/10_of_clubs.png',
    'static/cards/PNG-cards-1.3/10_of_diamonds.png',
    'static/cards/PNG-cards-1.3/10_of_hearts.png',
    'static/cards/PNG-cards-1.3/10_of_spades.png',
    'static/cards/PNG-cards-1.3/2_of_clubs.png',
    'static/cards/PNG-cards-1.3/2_of_diamonds.png',
    'static/cards/PNG-cards-1.3/2_of_hearts.png',
    'static/cards/PNG-cards-1.3/2_of_spades.png',
    'static/cards/PNG-cards-1.3/3_of_clubs.png',
    'static/cards/PNG-cards-1.3/3_of_diamonds.png',
    'static/cards/PNG-cards-1.3/3_of_hearts.png',
    'static/cards/PNG-cards-1.3/3_of_spades.png',
    'static/cards/PNG-cards-1.3/4_of_clubs.png',
    'static/cards/PNG-cards-1.3/4_of_diamonds.png',
    'static/cards/PNG-cards-1.3/4_of_hearts.png',
    'static/cards/PNG-cards-1.3/4_of_spades.png',
    'static/cards/PNG-cards-1.3/5_of_clubs.png',
    'static/cards/PNG-cards-1.3/5_of_diamonds.png',
    'static/cards/PNG-cards-1.3/5_of_hearts.png',
    'static/cards/PNG-cards-1.3/5_of_spades.png',
    'static/cards/PNG-cards-1.3/6_of_clubs.png',
    'static/cards/PNG-cards-1.3/6_of_diamonds.png',
    'static/cards/PNG-cards-1.3/6_of_hearts.png',
    'static/cards/PNG-cards-1.3/6_of_spades.png',
    'static/cards/PNG-cards-1.3/7_of_clubs.png',
    'static/cards/PNG-cards-1.3/7_of_diamonds.png',
    'static/cards/PNG-cards-1.3/7_of_hearts.png',
    'static/cards/PNG-cards-1.3/7_of_spades.png',
    'static/cards/PNG-cards-1.3/8_of_clubs.png',
    'static/cards/PNG-cards-1.3/8_of_diamonds.png',
    'static/cards/PNG-cards-1.3/8_of_hearts.png',
    'static/cards/PNG-cards-1.3/8_of_spades.png',
    'static/cards/PNG-cards-1.3/9_of_clubs.png',
    'static/cards/PNG-cards-1.3/9_of_diamonds.png',
    'static/cards/PNG-cards-1.3/9_of_hearts.png',
    'static/cards/PNG-cards-1.3/9_of_spades.png',
    'static/cards/PNG-cards-1.3/ace_of_clubs.png',
    'static/cards/PNG-cards-1.3/ace_of_diamonds.png',
    'static/cards/PNG-cards-1.3/ace_of_hearts.png',
    'static/cards/PNG-cards-1.3/ace_of_spades.png',
    'static/cards/PNG-cards-1.3/ace_of_spades2.png',
    'static/cards/PNG-cards-1.3/black_joker.png',
    'static/cards/PNG-cards-1.3/jack_of_clubs.png',
    'static/cards/PNG-cards-1.3/jack_of_clubs2.png',
    'static/cards/PNG-cards-1.3/jack_of_diamonds.png',
    'static/cards/PNG-cards-1.3/jack_of_diamonds2.png',
    'static/cards/PNG-cards-1.3/jack_of_hearts.png',
    'static/cards/PNG-cards-1.3/jack_of_hearts2.png',
    'static/cards/PNG-cards-1.3/jack_of_spades.png',
    'static/cards/PNG-cards-1.3/jack_of_spades2.png',
    'static/cards/PNG-cards-1.3/king_of_clubs.png',
    'static/cards/PNG-cards-1.3/king_of_clubs2.png',
    'static/cards/PNG-cards-1.3/king_of_diamonds.png',
    'static/cards/PNG-cards-1.3/king_of_diamonds2.png',
    'static/cards/PNG-cards-1.3/king_of_hearts.png',
    'static/cards/PNG-cards-1.3/king_of_hearts2.png',
    'static/cards/PNG-cards-1.3/king_of_spades.png',
    'static/cards/PNG-cards-1.3/king_of_spades2.png',
    'static/cards/PNG-cards-1.3/queen_of_clubs.png',
    'static/cards/PNG-cards-1.3/queen_of_clubs2.png',
    'static/cards/PNG-cards-1.3/queen_of_diamonds.png',
    'static/cards/PNG-cards-1.3/queen_of_diamonds2.png',
    'static/cards/PNG-cards-1.3/queen_of_hearts.png',
    'static/cards/PNG-cards-1.3/queen_of_hearts2.png',
    'static/cards/PNG-cards-1.3/queen_of_spades.png',
    'static/cards/PNG-cards-1.3/queen_of_spades2.png',
    'static/cards/PNG-cards-1.3/red_joker.png',
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getCards() {
    // returns a random selection of 10 cards from allCards
    
    const cards = [];
    const usedIndices = new Set();

    while (cards.length < 10) {
        const index = Math.floor(Math.random() * allCards.length);
        if (usedIndices.has(index) == false) {
            usedIndices.add(index);
            cards.push(allCards[index]);
        }
    }

    return cards;
}


function createCards() {
    // create and render 10 cards on screen

    const cardGrid = document.getElementById('cardGrid');
    cardGrid.innerHTML = '';

    const cards = getCards();

    cards.forEach((cardFile) => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';

        const card = document.createElement('div');
        card.className = 'card';

        const front = document.createElement('div');
        front.className = 'front';
        front.style.backgroundImage = `url('${cardFile}')`;

        const back = document.createElement('div');
        back.className = 'card-back';
        back.innerHTML = '<h3>back</h3>';

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener('click', function() {
            card.classList.toggle('flipped');
        });

        cardContainer.appendChild(card);
        cardGrid.appendChild(cardContainer);
    });
}


async function flipAll() {
    // flip all cards, if all cards are already flipped, unflip them
    
    const cards = document.querySelectorAll('.card')
    allFlipped = true

    cards.forEach((card) => {
        if (!card.classList.contains('flipped')) {
            allFlipped = false
        }
    });
    console.log(allFlipped);
    if (allFlipped) {
        cards.forEach((card) => {
            card.classList.remove('flipped');
        });
    } else {
        cards.forEach((card) => {
            if (!card.classList.contains('flipped')) {
                card.classList.add('flipped');
            }
        });
    }

    await sleep(600); 
}


async function returnCards() {
    // Flip cards
    const cards = document.querySelectorAll('.card')
    cards.forEach((card) => {
        card.classList.remove('flipped');
    });
    await sleep(600); 
    
    const containers = Array.from(document.querySelectorAll('.card-container'));
    const deck = document.querySelector('.deck').getBoundingClientRect();

    // Move cards to deck
    containers.forEach((card, i) => {
        const cardRect  = card.getBoundingClientRect();

        const deckX = deck.left + deck.width / 2;
        const deckY = deck.top + deck.height / 2;

        const cardX = cardRect.left + cardRect.width / 2;
        const cardY = cardRect.top + cardRect.height / 2;

        const dx = deckX - cardX;
        const dy = deckY - cardY;

        card.style.setProperty('--dx', `${dx}px`);
        card.style.setProperty('--dy', `${dy}px`);
        card.style.setProperty('--delay', `${i * 50}ms`);

        card.classList.add('move-cards');
    });
    
    // Add animation delay
    const moveDuration = 800;
    const delay = 50 * (containers.length - 1);
    await sleep(moveDuration + delay + 500);
}


async function dealCards() {
    // Create 10 new cards and place them in the center
    createCards();

    const containers = Array.from(document.querySelectorAll('.card-container'));
    const deck = document.querySelector('.deck').getBoundingClientRect();
    
    containers.forEach((card, i) => {
        const cardRect  = card.getBoundingClientRect();

        const deckX = deck.left + deck.width / 2;
        const deckY = deck.top + deck.height / 2;

        const cardX = cardRect.left + cardRect.width / 2;
        const cardY = cardRect.top + cardRect.height / 2;

        const dx = deckX - cardX;
        const dy = deckY - cardY;

        card.style.setProperty('--dx', `${dx}px`);
        card.style.setProperty('--dy', `${dy}px`);
        card.style.setProperty('--delay', `${i * 50}ms`);

        card.style.transition = 'none';
        card.classList.add('move-cards');
    });

    // Move cards back to original position
    void document.body.offsetWidth;
    containers.forEach(ct => ct.style.removeProperty('transition'));
    await sleep(20);
    containers.forEach(ct => ct.classList.remove('move-cards'));

    // Add animation delay
    const moveDuration = 800;
    const delay = 50 * (containers.length - 1);
    await sleep(moveDuration + delay + 500);
}


async function shuffleCards() {
    await returnCards();
    await dealCards();
}
  
document.getElementById('flip-all').addEventListener('click', flipAll);
document.getElementById('shuffle').addEventListener('click', shuffleCards);
document.getElementById('deal').addEventListener('click', dealCards);
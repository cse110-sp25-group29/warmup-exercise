function createCards() {
    const cardGrid = document.getElementById('cardGrid');
    const images = [
        'static/cards/PNG-cards-1.3/2_of_hearts.png',
        'static/cards/PNG-cards-1.3/3_of_hearts.png',
        'static/cards/PNG-cards-1.3/4_of_hearts.png',
        'static/cards/PNG-cards-1.3/5_of_hearts.png',
        'static/cards/PNG-cards-1.3/ace_of_hearts.png',
        'static/cards/PNG-cards-1.3/2_of_clubs.png',
        'static/cards/PNG-cards-1.3/3_of_clubs.png',
        'static/cards/PNG-cards-1.3/4_of_clubs.png',
        'static/cards/PNG-cards-1.3/5_of_clubs.png',
        'static/cards/PNG-cards-1.3/ace_of_clubs.png',
    ];

    images.forEach((imgFile) => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';

        const card = document.createElement('div');
        card.className = 'card';

        const front = document.createElement('div');
        front.className = 'front';
        front.style.backgroundImage = `url('${imgFile}')`;

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
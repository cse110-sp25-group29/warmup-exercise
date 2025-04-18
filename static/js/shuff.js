const shuffleAndRedeal = async function() {
    await animateShuffle();
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

/**
 * Builds 52 backs, fans them far apart (no overlap),
 * then riffles them back in perfect interleave.
 */
const animateShuffle = function() {
    return new Promise(resolve => {
      const deckEl = document.querySelector('.cards-deck');
      deckEl.innerHTML = '';
      const TOTAL = 52;
      const cardsAnim = [];
  
      // 1) Create 52 face‑down backs
      for (let i = 0; i < TOTAL; i++) {
        const c = document.createElement('div');
        c.classList.add('shuffle-card');
        c.style.transform = 'translate(0, 0) rotate(0deg)';
        c.style.zIndex = TOTAL - i;
        deckEl.appendChild(c);
        cardsAnim.push(c);
      }
  
      // timing (ms)
      const STAGE1      = 1000,  // move & rotate container
            SPLIT_DELAY = 200,
            SPLIT_DUR   = 500,
            BETWEEN     = 200,
            STEP        = 50,    //delay between each card coming nito the center
            STAGE4      = 500;
  
      // Stage 1: bring container to center & stand upright
      setTimeout(() => deckEl.classList.add('stage1'), 10);
  
      // Stage 2: fan apart left & right (no cards in center)
      setTimeout(() => {
        const OFFSET = 200;  // bump this so the two piles clear center
        const ANGLE  = 15;
        cardsAnim.forEach((c, idx) => {
          if (idx < TOTAL/2) {
            c.style.transform = `translate(${-OFFSET}px, 0) rotate(${-ANGLE}deg)`;
          } else {
            c.style.transform = `translate(${OFFSET}px, 0) rotate(${ANGLE}deg)`;
          }
        });
      }, STAGE1 + SPLIT_DELAY);
  
      // Stage 3: riffle back in perfect interleave L‑R‑L‑R…
      const riffleStart = STAGE1 + SPLIT_DELAY + SPLIT_DUR + BETWEEN;
      // build [0,26,1,27,2,28,…]
      const order = [];
      for (let k = 0; k < TOTAL/2; k++) {
        order.push(k, TOTAL/2 + k);
      }
      order.forEach((cardIdx, i) => {
        const c = cardsAnim[cardIdx];
        setTimeout(() => {
          c.style.transform = 'translate(0, 0) rotate(0deg)';
          c.style.zIndex = i;  // re‑stack in return order
        }, riffleStart + i * STEP);
      });
  
      // Stage 4: flip container back & clean up
      const finish = riffleStart + TOTAL * STEP + STAGE4;
      setTimeout(() => {
        deckEl.classList.remove('stage1');
        setTimeout(() => {
          deckEl.innerHTML = '';
          resolve();
        }, 1000);
      }, finish);
    });
  };
  

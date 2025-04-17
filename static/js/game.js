function random(number, min) {
    return Math.random() * number + min;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function spin(x, y) {
    var ret = []
    ret.push({ transform: "translateX(0px) translateY(0px) rotate(0) scale(1)"})
    ret.push({ transform: "translateX(" + x + "px) translateY(" + y + "px) rotate(0) scale(1)"})
    ret.push({ transform: "translateX(" + x + "px) translateY(" + y + "px) rotate(" + random(720, -360) + "deg) scale(1)"})
    ret.push({ transform: "translateX(" + x + "px) translateY(" + y + "px) rotate(0) scale(1)"})
    ret.push({ transform: "translateX(0px) translateY(0px) rotate(0) scale(1)"})

    return ret
}
  
const cardSpinTiming = {
    duration: 1500,
    iterations: 1,
};

document.querySelector(".shuffle").addEventListener("click", () => {
    const cardGrid = document.querySelector(".card-grid");
    const containers = Array.from(cardGrid.querySelectorAll(".card-container"));

    shuffleArray(containers);

    containers.forEach(container => {
        cardGrid.appendChild(container);
    });

    const nodeList = document.querySelectorAll(".card");
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].animate(spin(
            document.querySelector(".deck").getBoundingClientRect().x -
                nodeList[i].getBoundingClientRect().x,
            document.querySelector(".deck").getBoundingClientRect().y - 
                nodeList[i].getBoundingClientRect().y),
            cardSpinTiming
        );
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const frontImages = [
        "ace_of_spades.png",
        "2_of_diamonds.png",
        "3_of_hearts.png",
        "4_of_clubs.png",
        "5_of_diamonds.png",
        "6_of_spades.png",
        "7_of_hearts.png",
        "8_of_clubs.png",
        "9_of_diamonds.png",
        "10_of_spades.png"
    ];

    const cards = document.querySelectorAll(".card .front");

    cards.forEach((front, index) => {
        front.style.backgroundImage = `url('/static/cards/PNG-cards-1.3/${frontImages[index]}')`;
        front.style.backgroundSize = "100% 100%";
        front.style.backgroundPosition = "center";
    });
});


function random(number, min) {
    return Math.random() * number + min;
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
    var nodeList = document.querySelectorAll(".card");
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].animate(spin(
            document.querySelector(".deck").getBoundingClientRect().x -
                nodeList[i].getBoundingClientRect().x,
            document.querySelector(".deck").getBoundingClientRect().y - 
                nodeList[i].getBoundingClientRect().y),
            cardSpinTiming)
    }
});
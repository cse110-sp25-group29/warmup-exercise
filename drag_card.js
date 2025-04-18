// board setup on loading the page
document.body.onload = setupBoard;

// the 7 columns on the board
const columns = []

/**
 * A class effectively just representing a div that contains
 * a few helper functions for moving cards around the board
 */
class Column {
    constructor(id) {
        console.assert(typeof(id) == "number", "rank should be number, is " + typeof(id))
        this.id = id

        this.col = document.createElement("div");
        this.col.id = "col"+id;
        this.col.classList.add("column")

        this.topIsFlipped = false

        this.order = []
    }

    setParent(parent) {
        parent.appendChild(this.col)
    }

    appendChild(card) {
        console.assert(typeof(card) == "object", "card should be object, is " + typeof(card))
        console.assert(card instanceof Card, "card should be Card, is not :(")

        this.order.push(card)
        this.col.appendChild(card.container)
    }

    getCenter() {
        return this.col.getBoundingClientRect().x + this.col.getBoundingClientRect().width / 2
    }

    // card should be a part of this column
    getStack(card) {
        var seenCard = false
        var ret = []

        for (const key of this.order.keys()) {
            if (this.order[key] == card || seenCard) {
                seenCard = true;
                ret.push(this.order[key])
            }
        }

        return ret
    }

    canAccept(card) {
        console.assert(typeof(card) == "object", "card should be object, is " + typeof(card))
        console.assert(card instanceof Card, "card should be Card, is not :(")
        
        // TODO: implement this
        return true
    }
}

/**
 * Contains the HTML/CSS info for a card + helper functions
 * to interact with the card
 */
class Card {
    constructor(rank, suit, column) {
        console.assert(typeof(rank) == "string", "rank should be a string, is " + typeof(rank))
        console.assert(typeof(suit) == "string", "suit should be a string, is " + typeof(suit))
        this.rank = rank
        this.suit = suit

        this.container = document.createElement("div")
        this.container.classList.add("card")
        this.container.style.zIndex = 0

        this.front = document.createElement("div")
        this.front.classList.add("card-front")
        this.front.style.backgroundImage = "url(/static/cards/PNG-cards-1.3/" + rank + "_of_" + suit + ".png)"

        this.back = document.createElement("div")
        this.back.classList.add("card-back")

        this.container.appendChild(this.front)
        this.container.appendChild(this.back)

        this.column = column
        this.column.appendChild(this)

        this.flip = this.flip.bind(this)
        this.mouseDown = this.mouseDown.bind(this)
        this.mouseMove = this.mouseMove.bind(this)
        this.mouseUp = this.mouseUp.bind(this)

        this.flipped = false
    }

    setParent(parent) {
        parent.appendChild(this.container)
    }

    setZ(z) {
        this.container.style.zIndex = z;
    }

    makeFlippable() {
        this.container.addEventListener('click', this.flip);
        this.flippable = true
    }

    makeUnflippable() {
        this.container.removeEventListener('click', this.flip)
        this.flippable = false
    }

    /**
     * Triggers the flipping animation for an unflipped card
     * and makes it draggable
     * 
     * @param {*} e The event that triggered the function
     */
    flip(e) {
        this.container.style.transform = 'rotateY(180deg)'
        this.makeUnflippable()
        this.makeDraggable()
        this.flipped = true
    }

    makeDraggable() {
        this.container.addEventListener('mousedown', this.mouseDown)
    }

    makeUndraggable() {
        this.container.removeEventListener('mousedown', this.mouseDown)
    }

    /**
     * Prepares all cards at and below the current card to be
     * dragged and creates an event that reacts to mouse
     * movements until the mouse is let go
     * 
     * @param {*} e The event that triggered the function
     */
    mouseDown(e) {
        this.dragStack = this.column.getStack(this)

        var priority = 0
        for (const key of this.dragStack.keys()) {
            var obj = this.dragStack[key]

            obj.elemX = obj.container.getBoundingClientRect().x;
            obj.elemY = obj.container.getBoundingClientRect().y;

            obj.container.style.top = obj.elemY + 'px'
            obj.container.style.left = obj.elemX + 'px'
            obj.setZ(100 + priority)
            priority += 1

            obj.startX = e.clientX
            obj.startY = e.clientY
        }

        // make position fixed AFTER initializing object positions
        // since otherwise cards further down move down before
        // we can get their initial position
        for (const key of this.dragStack.keys()) {
            this.dragStack[key].container.style.position = 'fixed'
        }

        document.addEventListener('mousemove', this.mouseMove)
        document.addEventListener('mouseup', this.mouseUp)
    }

    /**
     * Shifts the cards currently on the stack to move
     * with the mouse
     * 
     * @param {*} e The event that triggered the function
     */
    mouseMove(e) {
        for (const key of this.dragStack.keys()) {
            var obj = this.dragStack[key]
            obj.newX = obj.startX - e.clientX
            obj.newY = obj.startY - e.clientY

            obj.startX = e.clientX
            obj.startY = e.clientY

            obj.elemY -= obj.newY
            obj.elemX -= obj.newX

            obj.container.style.top = obj.elemY + 'px'
            obj.container.style.left = obj.elemX + 'px'
        }
    }

    /**
     * When the mouse button is let go, we try to put the
     * current card stack in the closest column if possible, or
     * return them back to their start space otherwise
     * 
     * @param {*} e The event that triggered the function
     */
    mouseUp(e) {
        console.log("up")
        document.removeEventListener('mousemove', this.mouseMove)
        document.removeEventListener('mouseup', this.mouseUp)

        for (const key of this.dragStack.keys()) {
            this.dragStack[key].container.style.position = 'static'
            this.dragStack[key].setZ(0)
        }

        let closestCol = null, bestX = 9999999999;
        for (const key of columns.keys()) {
            var col = columns[key]
            var dx = this.elemX + this.container.getBoundingClientRect().width / 2 
                        - col.getCenter()
            
            if (Math.abs(dx) < bestX) {
                bestX = Math.abs(dx)
                closestCol = col
            }
        }

        if (closestCol.canAccept(this) && this.column != closestCol) {
            exchangeColumn(this.column, closestCol, this.dragStack)
        }
    }
}

/**
 * Moves a stack of cards from one column to the other
 * 
 * @param {*} col1 The column the cards were in initially
 * @param {*} col2 The column the cards are destined for
 * @param {*} cardStack The cards
 */
function exchangeColumn(col1, col2, cardStack) {
    console.log("exhange")
    for (const key of cardStack.keys()) {
        cardStack[key].column = col2
        col2.appendChild(cardStack[key])
        col1.order.pop()
    }
}

/**
 * Prepares the objects for the board
 */
function setupBoard() {
    const currentSection = document.getElementsByClassName("board")[0];

    for (var i = 0; i < 7; i++) {
        var col = new Column(i);
        col.setParent(currentSection)

        for (var j = 0; j <= i; j++) {
            var card = new Card(""+ (j+2), 'spades', col);
            // card.setParent(col)

            if (j == i)
                card.makeFlippable()
        }

        columns.push(col)
    }
}
# warmup-exercise
*Week 3 Warmup Exercise - Team and Technology DeRisk*

## Info
Each team will be making a branch of this repo to work on.
- Tutorial Teams will be naming their branch `tutorial-A` or `tutorial-B`
- Intermediate Teams will be naming their branch `interm-A` or `interm-B`

See the last [meeting minutes](https://cse11029boompow.slack.com/docs/T08MKM8RC4X/F08NJ3M9UAV) for more information.

### Rough Timeline
- 4/15 Tuesday: Teams have made their branches and started working either on `title.html` for tutorial teams or `game.html` for intermediate teams.
- 4/16 Wednesday: Teams have finished their 1st task and should be in their 2nd.
- 4/17 Thursday: Teams should have some functionality. We will be checking in on everyone's progress and assess if we will proceed with the other objectives in the assignment.(Step 1 finished)
- 4/19 Saturday: Finished Solitaire!
- 4/20 Sunday: Branches are merged, deliverables are finished and submitted.


### Repo Structure(Start up)
```
warmup-exercise/ (each team make a branch)
| - README.md (has the tutorials)
    | - title.html
    | - game.html
    | - static/
        | - css/
            | - style.css
        | - js/
            | - game.js
        | - cards/
            | - ...
```

`title.html`
- Function: Title Screen
- Elements:
  - Title text
  - Start game button: redirect to /game.html

`game.html`
- Function: Game Screen
- Elements:
  - 2 x 5 grid of cards, initially face down
  - Deck at the top of the screen
  - Button for shuffling and redeal
  - Flip card, shuffle & redeal animation
  - *Optional: See objective 2 and 3 on Canvas*

 ### Repo Structure(Final)
```
warmup-exercise/
| - README.md (has the tutorials)
    | - title.html # title page
    | - game.html # easy (step1) page
    | - solitaire.html # Solitaire (step1+2+3) page
    | - static/
        | - css/
            | - style.css # easy's css
            | - solitaire.css # Solitaire's css
        | - js/
            | - game.js # easy's js
            | - solitaire.js # Solitaire's js
        | - logo/
            | - bg.png # group logo
        | - cards/
            | - ...
```

## Resources
- [Card Flip Tutorial](https://www.youtube.com/watch?v=QON4dFDzsiE)
- [Beginner CSS Animations](https://youtu.be/SgmNxE9lWcY)


/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game{

    constructor()
    {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;

        this.keyboardPress = [];
    }

    createPhrases()
    {
        let tempPhrase = null;
        let tempPhrases = [];

        const phraseArray = [
            'Life is like a box of chocloates',
            'Knock it out of the park',
            'Down for the count',
            'Throw in the towel',
            'Birds of a feather flock together',
            'The early bird gets the worm'
        ]

        phraseArray.forEach(phrase => {

            tempPhrase = new Phrase(phrase);
            tempPhrases.push(tempPhrase);
        
        });

        return tempPhrases;
    }

    getRandomPhrase()
    {
        let phraseNumber = Math.floor(Math.random() * (this.phrases.length));
        return this.phrases[phraseNumber];
    }

    startGame()
    {
        const $divOverlay = $('#overlay');
        $divOverlay.hide();

        let allButtonNodeList = document.getElementsByClassName('key');
        this.allButtonNodeArray = Array.from(allButtonNodeList);

        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();

    }

    handleInteraction(button)
    {
        button.disabled = true;
        
        if (this.activePhrase.checkLetter(button.innerText)) 
        {
            button.className = 'chosen';

            if (this.checkForWin()) 
            {
                this.gameOver(true);
            }
        }
        else
        {
            button.className = 'wrong';
            this.removeLife();
        }
        
    }

    handleInteractionKeyboard(keypress)
    {
        if(!this.keyboardPress.includes(keypress))
        {
            for (let index = 0; index < allButtonNodeArray.length; index++)
            {
                if (allButtonNodeArray[index].innerText === keypress && allButtonNodeArray[index].disabled === false)
                {
                    allButtonNodeArray[index].disabled = true;

                    if (this.activePhrase.checkLetter(keypress)) 
                    {
                        allButtonNodeArray[index].className = 'chosen';

                        if (this.checkForWin()) 
                        {
                            this.gameOver(true);
                        }
                    }
                    else
                    {
                        allButtonNodeArray[index].className = 'wrong';
                        this.removeLife();
                    }

                    break;
                }
                
            }

        }

        this.keyboardPress.push(keypress);
    }

    checkForWin()
    {
        const showClass = 'show';
        const spaceClass = 'space';

        var nodeListShowClass = document.getElementsByClassName(showClass);
        var nodeListSpaceClass = document.getElementsByClassName(spaceClass);

        if (nodeListShowClass.length + nodeListSpaceClass.length === this.activePhrase.phrase.length)
        {
            return true;
        } 
        else 
        {
            return false;
        }

    }

    removeLife()
    {
        this.missed += 1;

        var allLIWithTriesClassNodeList = document.getElementsByClassName('tries');
        
        allLIWithTriesClassNodeList[this.missed - 1].firstChild.src = "images/lostHeart.png";

        if (this.missed === 5) 
        {
            this.gameOver(false);
        }

    }

    gameOver(gameWon)
    {
        const $divOverlay = $('#overlay');
        const $h1GameOverMessage = $('#game-over-message');

        if (gameWon) 
        {
            $h1GameOverMessage.text('Congratulations! You figured out the phrase.');
            $divOverlay.attr('class', 'win');
        }
        else
        {
            $h1GameOverMessage.text('Sorry! You ran out of lives.');
            $divOverlay.attr('class', 'lose');
        }

        $divOverlay.show();
    }

    gameReset()
    {
        // Reset LI elements for phrase
    
        const $divPhrase = $('#phrase');
        var newUL = document.createElement("ul");
        $divPhrase.html(newUL.outerHTML);

        // reset lives

        var allLIWithTriesClassNodeList = document.getElementsByClassName('tries');
        var allLIWithTriesClassArray = Array.from(allLIWithTriesClassNodeList);

        for (let index = 0; index < allLIWithTriesClassArray.length; index++) 
        {
            allLIWithTriesClassArray[index].firstChild.src = "images/liveHeart.png";
        }

        // reset missed

        this.missed = 0;

        // reset keyboard press

        this.keyboardPress = [];
    }

}
/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game{

    /**************************************************************************
     * Constructor
     * Inputs: N/A
     * Outputs: N/A
     * 
     * Description: This constructor setsup the game class by setting the 
     * variables to initial game state.
     * 
     **************************************************************************/

    constructor()
    {
        // missed: is the number of questions missed by user; Initially 0 at game start

        this.missed = 0;

        // phrases: is an array of phrase for the game to randomly select

        this.phrases = this.createPhrases();

        // activePhrase: is the phrase that is currently in play for the game

        this.activePhrase = null;

        // keyboardPress: array of the keyboard keys that have already been pressed by user

        this.keyboardPress = [];
    }

    /**************************************************************************
     * createPhrases
     * Inputs: N/A
     * Outputs: Array of phrase objects
     * 
     * Description: This function creates and returns the phrase array to be used 
     * for gameplay. If additional phrases are to be added to the game, enter them 
     * in the phraseArray.
     * 
     **************************************************************************/

    createPhrases()
    {
        // Setup variables to be used in creating array

        let tempPhrase = null; // null phrase
        let tempPhrases = []; // empty array

        // Phrases to be used during game

        const phraseArray = [
            'Life is like a box of chocloates',
            'Knock it out of the park',
            'Down for the count',
            'Throw in the towel',
            'Birds of a feather flock together',
            'The early bird gets the worm'
        ]

        // for each phrase in the array, create a phrase object and add to tempPhrases array

        phraseArray.forEach(phrase => {

            tempPhrase = new Phrase(phrase);
            tempPhrases.push(tempPhrase);
        
        });

        // return the complete array of phrase objects

        return tempPhrases;
    }

    /**************************************************************************
     * createPhrases
     * Inputs: N/A
     * Outputs: phrase object
     * 
     * Description: This function will pick a phrase object in this.phgrases and return
     * to the calling function.
     * 
     **************************************************************************/

    getRandomPhrase()
    {
        // Find a number within the array length

        let phraseNumber = Math.floor(Math.random() * (this.phrases.length));

        // return random selected phrase object

        return this.phrases[phraseNumber];
    }

    /**************************************************************************
     * startGame
     * Inputs: N/A
     * Outputs: N/A
     * 
     * Description: This function hides the main page after user presses start game 
     * button and makes sure all the buttons are enabled for use for the user to click.
     * 
     * It will then select a phrase for the player to guess and display it to the user.
     * 
     **************************************************************************/

    startGame()
    {
        // get DOM element div to hide from user

        const $divOverlay = $('#overlay');
        $divOverlay.hide();

        // get DOM elements buttons to enable for the user to start a fresh game

        let allButtonNodeList = document.getElementsByClassName('key');
        this.allButtonNodeArray = Array.from(allButtonNodeList);

        for (let index = 0; index < allButtonNodeArray.length; index++)
        {
            allButtonNodeArray[index].disabled = false;   
        }

        // get random phrase for user to guess

        this.activePhrase = this.getRandomPhrase();

        // display the place holders for the user to see

        this.activePhrase.addPhraseToDisplay();

    }

    /**************************************************************************
     * handleInteraction
     * Inputs: button element
     * Outputs: N/A
     * 
     * Description: This function handles the interaction of the button press on the screen
     * from the user. 
     * 
     * 1.) The button is disabled so the user cannot press it again.
     * 2.) If the button letter is in the phrase, let the user know and check for win
     *     else let the user know it is a bad selection and remove life.
     * 
     **************************************************************************/

    handleInteraction(button)
    {
        // disable button

        button.disabled = true;
        
        // check to see if letter is in the phrase

        if (this.activePhrase.checkLetter(button.innerText)) 
        {
            // show the user the letter is a good selection 

            button.className = 'chosen';
            button.classList.add('animated', 'flip');

            // check for win

            if (this.checkForWin()) 
            {
                // if the user won, initiate game over message

                this.gameOver(true);
            }
        }
        else
        {
            // show the user the letter is a bad selection

            button.className = 'wrong';
            button.classList.add('animated', 'shake');

            // remove a life from the user

            this.removeLife();
        }
        
    }

    /**************************************************************************
     * handleInteractionKeyboard
     * Inputs: keypress
     * Outputs: N/A
     * 
     * Description: This function is to handle the user input from the keyboard on the 
     * computer. 
     * 
     * 1.) check to see if the keyboard press has been pressed before.
     * 2.) If it has not been pressed, loop through all the buttons on the screen
           if the button on the screen matches the keyboard and is not already disabled,
           give indication to the user of the good/bad input and then break from the loop.
       3.) add keyboard press to array to keep track of what has been pressed
     * 
     **************************************************************************/

    handleInteractionKeyboard(keypress)
    {
        // check to see if key has been pressed in the past

        if(!this.keyboardPress.includes(keypress))
        {
            // if it was not pressed, loop through keys on screen

            for (let index = 0; index < allButtonNodeArray.length; index++)
            {
                // if the keypress matches one of the keys on screen and it is not disabled already

                if (allButtonNodeArray[index].innerText === keypress && allButtonNodeArray[index].disabled === false)
                {
                    // disable on screen button

                    allButtonNodeArray[index].disabled = true;

                    // check to see if the letter is in the phrase

                    if (this.activePhrase.checkLetter(keypress)) 
                    {
                        // show the user the letter is a good selection

                        allButtonNodeArray[index].className = 'chosen';
                        allButtonNodeArray[index].classList.add('animated', 'flip');

                        // check for win

                        if (this.checkForWin()) 
                        {
                            // if the user won, let the user know

                            this.gameOver(true);
                        }
                    }
                    else
                    {
                        // show the user the letter is a bad selection

                        allButtonNodeArray[index].className = 'wrong';
                        allButtonNodeArray[index].classList.add('animated', 'shake');

                        // remove a life from the user

                        this.removeLife();
                    }

                    break;
                }
                
            }

            // add keypress to array to keep track 
        
            this.keyboardPress.push(keypress);

        }
        
    }

    /**************************************************************************
     * checkForWin
     * Inputs: N/A
     * Outputs: win status boolean
     * 
     * Description: this function checks to see if the user has won yet or not.
     * 
     **************************************************************************/

    checkForWin()
    {
        // setup class constants

        const showClass = 'show';
        const spaceClass = 'space';

        // get DOM elements with class costants

        var nodeListShowClass = document.getElementsByClassName(showClass);
        var nodeListSpaceClass = document.getElementsByClassName(spaceClass);

        // check to see if the user has won by comparing the spaces and letters shown to character count of phrase

        if (nodeListShowClass.length + nodeListSpaceClass.length === this.activePhrase.phrase.length)
        {
            // user won

            return true;
        } 
        else 
        {
            // user has not won yet

            return false;
        }

    }

    /**************************************************************************
     * removeLife
     * Inputs: N/A
     * Outputs: N/A
     * 
     * Description: This function removes a life from the user and checks to see
     * if the user has any lives left. If they have ran out of lives, it ends the game.
     * 
     **************************************************************************/

    removeLife()
    {
        // add missed guess to the count

        this.missed += 1;

        // get DOM elements with the class tries

        var allLIWithTriesClassNodeList = document.getElementsByClassName('tries');
        
        // change the image from a full heart to an empty heart

        allLIWithTriesClassNodeList[this.missed - 1].firstChild.src = "images/lostHeart.png";

        // check to see if user is out of lives

        if (this.missed === 5) 
        {
            // if user is out of lives end the game

            this.gameOver(false);
        }

    }

    /**************************************************************************
     * gameOver
     * Inputs: gameWon - boolean
     * Outputs: N/A
     * 
     * Description: This function lets the user know if they had won or lost and prepares
     * for the next game.
     * 
     **************************************************************************/

    gameOver(gameWon)
    {
        // disable buttons so the user cannot select and see on the end screen

        for (let index = 0; index < allButtonNodeArray.length; index++)
        {
            // remove animations and disable

            allButtonNodeArray[index].classList.remove('animated', 'shake');
            allButtonNodeArray[index].classList.remove('animated', 'flip');
            allButtonNodeArray[index].disabled = true;
            
        }

        // get the overlay display and header for user message

        const $divOverlay = $('#overlay');
        const $h1GameOverMessage = $('#game-over-message');

        if (gameWon) 
        {
            // if the user won set display message and color

            $h1GameOverMessage.text('Congratulations! You figured out the phrase.');
            $divOverlay.attr('class', 'win');
        }
        else
        {
            // if the user lost set display message and color

            $h1GameOverMessage.text('Sorry! You ran out of lives.');
            $divOverlay.attr('class', 'lose');
        }

        // show overlay to user

        $divOverlay.show();
    }

    /**************************************************************************
     * gameReset
     * Inputs: N/A
     * Outputs: N/A
     * 
     * Description: This function resets the game elements for the next game for the user.
     * 
     **************************************************************************/

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
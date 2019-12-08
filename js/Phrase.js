/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase{

    /**************************************************************************
     * Constructor
     * Inputs: phrase - string
     * Outputs: N/A
     * 
     * Description: This constructor setsup the phrase class with the phrase to all
     * lowercase letters.
     * 
     **************************************************************************/

    constructor(phrase)
    {
        // set phrase string to lowercase letters

        this.phrase = phrase.toLowerCase();
    }

    /**************************************************************************
     * addPhraseToDisplay
     * Inputs: N/A
     * Outputs: N/A
     * 
     * Description: This function dislays the phrase letter place holders to the user.
     * 
     **************************************************************************/

    addPhraseToDisplay()
    {
        // get DOM element for phrase

        const $divPhrase = $('#phrase');

        // setup class constants

        const letterClass = 'hide letter ';
        const spaceClass = 'space';

        // create new unordered list DOM element

        var newUL = document.createElement("ul");
        
        // create var to hold the new LI and characters of the phrase

        var newLI = null;
        var phraseCharacter = null;

        // loop through all characters in the phrase

        for (let index = 0; index < this.phrase.length; index++) 
        {
            // get character at index

            phraseCharacter = this.phrase[index];

            // create new list element and sets its text to the chracter

            newLI = document.createElement('li');
            newLI.textContent = phraseCharacter;

            // if the character is a space

            if (phraseCharacter === ' ') 
            {
                // set the class name to spaceClass

                newLI.className = spaceClass;
            } 
            else 
            {
                // set the class name to letter class + character 

                newLI.className = letterClass + phraseCharacter;
            }

            // append the new LI DOM element to the UL element

            newUL.appendChild(newLI);
        }

        // replace the exisiting UL element in the phrase with the new one

        $divPhrase.html(newUL.outerHTML);

    }

    /**************************************************************************
     * checkLetter
     * Inputs: letter - character
     * Outputs: found - boolean
     * 
     * Description: this funtions checks to see if the letter is in the phrase or not
     * and returns true or false.
     * 
     **************************************************************************/

    checkLetter(letter)
    {
        // get the index of the letter in the phrase (-1 if not found)

        let foundIndex = this.phrase.indexOf(letter);

        // if not found

        if (foundIndex === -1) 
        {
            // return false

            return false;
        } 
        else 
        {
            // if found show the letters on the phrase area and return true
            this.showMatchedLetter(letter);
            return true;
        }

    }

    /**************************************************************************
     * showMatchedLetter
     * Inputs: letter - character
     * Outputs: N/A
     * 
     * Description: this function displays the letter in the phrase by looking at the class
     * of the li element.
     * 
     **************************************************************************/

    showMatchedLetter(letter)
    {
        // create letter class constant

        const letterClass = 'hide letter ' + letter;

        // get all li elements with that class name

        var allLIWithLetterClassNodeList = document.getElementsByClassName(letterClass);
        var allLIWithLetterClassArray = Array.from(allLIWithLetterClassNodeList);

        // loop through all li elements found and set class to show
        
        for (let index = 0; index < allLIWithLetterClassArray.length; index++) 
        {
            allLIWithLetterClassArray[index].className = 'show';
        }

    }


}
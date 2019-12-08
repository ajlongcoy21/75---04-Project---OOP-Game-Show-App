/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase{

    constructor(phrase)
    {
        this.phrase = phrase.toLowerCase();
    }

    addPhraseToDisplay()
    {
        const $divPhrase = $('#phrase');

        const letterClass = 'hide letter ';
        const spaceClass = 'space';

        var newUL = document.createElement("ul");
        var newLI = null;
        var phraseCharacter = null;

        for (let index = 0; index < this.phrase.length; index++) 
        {
            phraseCharacter = this.phrase[index];

            newLI = document.createElement('li');
            newLI.textContent = phraseCharacter;

            if (phraseCharacter === ' ') 
            {
                newLI.className = spaceClass;
            } 
            else 
            {
                newLI.className = letterClass + phraseCharacter;
            }

            newUL.appendChild(newLI);
        }

        $divPhrase.html(newUL.outerHTML);

    }

    checkLetter(letter)
    {
        let foundIndex = this.phrase.indexOf(letter);

        if (foundIndex === -1) 
        {
            return false;
        } 
        else 
        {
            this.showMatchedLetter(letter);
            return true;
        }

    }

    showMatchedLetter(letter)
    {
        const letterClass = 'hide letter ' + letter;

        var allLIWithLetterClassNodeList = document.getElementsByClassName(letterClass);
        var allLIWithLetterClassArray = Array.from(allLIWithLetterClassNodeList);

        for (let index = 0; index < allLIWithLetterClassArray.length; index++) 
        {
            allLIWithLetterClassArray[index].className = 'show';
        }

    }


}
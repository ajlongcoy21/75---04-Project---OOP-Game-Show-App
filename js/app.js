/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

 const $buttonReset = $('#btn__reset');
  
 let allButtonNodeList = document.getElementsByClassName('key');
 let allButtonNodeArray = Array.from(allButtonNodeList);

 const game = new Game();

 // Add Event Listeners

 document.addEventListener('keypress', event => {
    
    if (event.charCode >= 97 && event.charCode <= 122) 
    {
        game.handleInteractionKeyboard(String.fromCharCode(event.which));
    }

 });

 $buttonReset.on('click', () => {

    // Reset buttons
    //reset buttons

    for (let index = 0; index < allButtonNodeArray.length; index++)
    {
    allButtonNodeArray[index].className = 'key';
    allButtonNodeArray[index].disabled = false;
        
    }

    game.gameReset();

    game.startGame();
    console.log(`Active Phrase - phrase: ${game.activePhrase.phrase}`);
    
 });

 for (let index = 0; index < allButtonNodeArray.length; index++)
 {
    allButtonNodeArray[index].addEventListener('click', event => {

        game.handleInteraction(event.target);

    });
     
 }


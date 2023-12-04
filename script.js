document.addEventListener('DOMContentLoaded', startGame);

const words = ['hangman', 'javascript', 'programming', 'developer', 'web'];
let selectedWord = '';
let guessedWord = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 6;

function startGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedWord = Array(selectedWord.length).fill('_');
  incorrectGuesses = 0;

  displayWord();
  displayKeyboard();
  updateIncorrectGuesses();
  updateMessage('');
}

function displayWord() {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = guessedWord.join(' ');
}

function displayKeyboard() {
  const keyboardContainer = document.getElementById('keyboard');
  keyboardContainer.innerHTML = '';

  for (let letter of 'abcdefghijklmnopqrstuvwxyz') {
    const key = document.createElement('div');
    key.className = 'key';
    key.textContent = letter;
    key.addEventListener('click', () => handleGuess(letter));
    keyboardContainer.appendChild(key);
  }
}

function handleGuess(letter) {
  if (guessedWord.includes(letter)) {
    updateMessage('You already guessed that letter. Try another one.');
    return;
  }

  if (selectedWord.includes(letter)) {
    updateGuessedWord(letter);
    if (guessedWord.join('') === selectedWord) {
      updateMessage('Congratulations! You guessed the word.');
    }
  } else {
    incorrectGuesses++;
    updateIncorrectGuesses();

    if (incorrectGuesses === maxIncorrectGuesses) {
      updateMessage(`Game over! The word was "${selectedWord}".`);
    }
  }
}

function updateGuessedWord(letter) {
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === letter) {
      guessedWord[i] = letter;
    }
  }
  displayWord();
}

function updateIncorrectGuesses() {
  const incorrectGuessesSpan = document.getElementById('incorrect-guesses');
  incorrectGuessesSpan.textContent = incorrectGuesses;
}

function updateMessage(message) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = message;
}

// Reset the game when the "Play Again" button is clicked
document.addEventListener('click', function (event) {
  if (event.target.tagName === 'DIV' && event.target.className === 'key') {
    event.target.classList.add('disabled');
  } else if (event.target.tagName === 'BODY') {
    // Reset the game when clicking outside the keyboard
    document.querySelectorAll('.key').forEach(key => key.classList.remove('disabled'));
    startGame();
  }
});

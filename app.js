let userScore = 0;
let compScore = 0;
const userScore_span = document.getElementById('user-score');
const compScore_span = document.getElementById('comp-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_div = document.querySelector('.result > p');
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');

function getCompChoice() {
  const choices = ['r', 'p', 's'];
  const randomNum = Math.floor(Math.random() * 3);
  return choices[randomNum];
}

function convertToWord(letter) {
  if (letter === 'r') return "Rock";
  if (letter === 'p') return "Paper";
  return "Scissors";
}

function resetGame() {
  setTimeout(() => document.getElementById('intro-msg').innerHTML = "Let's go again. First to 10, wins!", 2000);
  userScore = 0;
  compScore = 0;
  userScore_span.innerHTML = userScore;
  compScore_span.innerHTML = compScore;
}

function winCondition (userScore, compScore) {
  if (userScore == 10) {
    result_div.innerHTML = "You got lucky this time! It won't happen again!!!"
    userScore_span.classList.add('user-score-green-glow');
    setTimeout(() => userScore_span.classList.remove('user-score-green-glow'), 2000);
    resetGame();
  } else if (compScore == 10) {
    result_div.innerHTML = "Yikes! You lost and I don't even have hands!"
    userScore_span.classList.add('user-score-red-glow');
    setTimeout(() => userScore_span.classList.remove('user-score-red-glow'), 2000);
    resetGame();
  }
}

function userWin(userChoice, compChoice) {
  const userChoice_div = document.getElementById(userChoice);
  userScore++;
  userScore_span.innerHTML = userScore;
  result_div.innerHTML = `${convertToWord(userChoice)} beats ${convertToWord(compChoice)}. You win!`;
  userChoice_div.classList.add('green-glow');
  setTimeout(() => userChoice_div.classList.remove('green-glow'), 400);
  winCondition(userScore, 0);
}

function userLose(userChoice, compChoice) {
  const userChoice_div = document.getElementById(userChoice);
  compScore++;
  compScore_span.innerHTML = compScore;
  result_div.innerHTML = `${convertToWord(userChoice)} doesn't beat ${convertToWord(compChoice)}. You lose.`;
  userChoice_div.classList.add('red-glow');
  setTimeout(() => userChoice_div.classList.remove('red-glow'), 400);
  winCondition(0, compScore);
}

function userDraw(userChoice, compChoice) {
  const userChoice_div = document.getElementById(userChoice);
  result_div.innerHTML = `You both picked ${convertToWord(userChoice)}. It's a draw!`;
  userChoice_div.classList.add('gray-glow');
  setTimeout(() => userChoice_div.classList.remove('gray-glow'), 400);
}

function game(userChoice) {
  const compChoice = getCompChoice();

  switch (userChoice + compChoice) {
    case 'rs':
    case 'pr':
    case 'sp':
      userWin(userChoice, compChoice);
      break;
    case 'rp':
    case 'ps':
    case 'sr':
      userLose(userChoice, compChoice);
      break;
    default:
      userDraw(userChoice, compChoice);
  }
}

function main() {
  rock_div.addEventListener('click', () => game('r'));

  paper_div.addEventListener('click', () => game('p'));

  scissors_div.addEventListener('click', () => game('s'));
}

main();

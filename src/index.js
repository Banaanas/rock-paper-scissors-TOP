// Import core.js
import "core-js";
import "regenerator-runtime/runtime";

// Import stylesheets
import "./styles/index.css";
import "./styles/normalize.css";

// Import Images
import paperIcon from "./images/paper.svg";
import rockIcon from "./images/rock.svg";
import scissorsIcons from "./images/scissors.svg";

// DOM Selection
const finalResult = document.querySelector("#final-result");
const roundsNumberDiv = document.querySelector("#rounds-number");
const roundResult1 = document.querySelector("#round-result-1");
const roundResult2 = document.querySelector("#round-result-2");
const currentScore = document.querySelector("#current-score");
const choiceButtons = document.querySelectorAll(".choice-buttons");
const newGameButton = document.querySelector("#new-game");

// Set Images src
const allImages = document.querySelectorAll("img");
allImages[0].src = paperIcon;
allImages[1].src = rockIcon;
allImages[2].src = scissorsIcons;


// Initialize variables
let computerScore;
let humanScore;
let humanChoice;
let computerChoice;
let roundsNumber;

// Start the Game - Function
function initialization() {
  computerScore = 0;
  humanScore = 0;
  roundsNumber = 0;

  // Enable Choice Buttons
  choiceButtons.forEach((item) => {
    item.disabled = false;
  });

  // Empty Final Results Div
  finalResult.style.visibility = "hidden";

  // Set temporary results textContent
  roundsNumberDiv.textContent = "Round O";
  roundResult1.textContent = "Let's Play !";
  currentScore.textContent = "0 - 0";
}

// Random Computer Choice - Function
function computerPlay() {
  const choix = ["rock", "paper", "scissors"];
  return choix[Math.floor(Math.random() * choix.length)];
}

// Player Win after 5 rounds - Function
function winFiveRounds() {
  if (humanScore < 5 && computerScore < 5) return;
  if (humanScore === 5) {
    finalResult.textContent = `Congratulations ! You won ${humanScore} rounds vs ${computerScore} for the Computer !`;
  } else if (computerScore === 5) {
    if (humanScore === 1) {
      finalResult.textContent = `Sorry ! You only won ${humanScore} round vs. ${computerScore} for the Computer !`;
    } else if (humanScore > 1) {
      finalResult.textContent = `Sorry ! You only won ${humanScore} rounds vs. ${computerScore} for the Computer !`;
    }
  }

  // Disable Choice Buttons
  choiceButtons.forEach((item) => {
    item.disabled = true;
  });

  // Display finalResults Div
  finalResult.style.visibility = "visible";
}

// Human Player - 1 Round Play - Function
function humanPlay(event) {
  humanChoice = event.currentTarget.id; // User's Choice
  computerChoice = computerPlay(); // Computer's Choice

  // Create 3 Span Elements
  const winnerChoiceDisplay = document.createElement("span");
  const loserChoiceDisplay = document.createElement("span");
  const beatsWordDisplay = document.createElement("span");

  // Set ID
  winnerChoiceDisplay.setAttribute("id", "winner-choice-display");
  loserChoiceDisplay.setAttribute("id", "loser-choice-display");
  beatsWordDisplay.setAttribute("id", "beats-word");

  // Set textContent
  beatsWordDisplay.textContent = "beats"; // Word span between humanChoice and computerChoice

  // Empty roundResult1 and append 3 Span Elements
  roundResult1.innerHTML = "";
  roundResult1.appendChild(winnerChoiceDisplay);
  roundResult1.appendChild(beatsWordDisplay);
  roundResult1.appendChild(loserChoiceDisplay);

  // If Tied Game
  if (humanChoice === computerChoice) {
    winnerChoiceDisplay.textContent = humanChoice;
    loserChoiceDisplay.textContent = computerChoice;
    beatsWordDisplay.textContent = "vs.";
    roundResult2.textContent = "Tie Game !";
    return;
  }

  // If No Tied Game
  beatsWordDisplay.textContent = "beats";

  if (humanChoice === "rock" && computerChoice === "paper") {
    computerScore += 1;
    roundResult2.textContent = "You lose !";
    winnerChoiceDisplay.textContent = computerChoice;
    loserChoiceDisplay.textContent = humanChoice;
  } else if (humanChoice === "paper" && computerChoice === "scissors") {
    computerScore += 1;
    roundResult2.textContent = "You lose !";
    winnerChoiceDisplay.textContent = computerChoice;
    loserChoiceDisplay.textContent = humanChoice;
  } else if (humanChoice === "scissors" && computerChoice === "rock") {
    computerScore += 1;
    roundResult2.textContent = "You lose !";
    winnerChoiceDisplay.textContent = computerChoice;
    loserChoiceDisplay.textContent = humanChoice;
  } else if (humanChoice === "rock" && computerChoice === "scissors") {
    humanScore += 1;
    roundResult2.textContent = "You won !";
    winnerChoiceDisplay.textContent = humanChoice;
    loserChoiceDisplay.textContent = computerChoice;
  } else if (humanChoice === "scissors" && computerChoice === "paper") {
    humanScore += 1;
    roundResult2.textContent = "You won !";
    winnerChoiceDisplay.textContent = humanChoice;
    loserChoiceDisplay.textContent = computerChoice;
  } else if (humanChoice === "paper" && computerChoice === "rock") {
    humanScore += 1;
    roundResult2.textContent = "You won !";
    winnerChoiceDisplay.textContent = humanChoice;
    loserChoiceDisplay.textContent = computerChoice;
  }

  // Update roundsNumber
  roundsNumber += 1;
  // Update roundsNumberDiv
  roundsNumberDiv.textContent = `Round ${roundsNumber}`;
  // Update currentScore
  currentScore.textContent = `${humanScore}-${computerScore}`;

  // Check if some Winner
  winFiveRounds();
}

// New Game Button - Event Listener
newGameButton.addEventListener("click", () => {
  // Empty roundResult2
  roundResult2.innerHTML = "";
  // Initialize Game
  initialization();
});

// Rock - Paper - Scissors Buttons - Event Listeners
for (let index = 0; index < choiceButtons.length; index++) {
  choiceButtons[index].addEventListener("click", humanPlay);
}

// Initialize Rock-Paper-Scissors Game
initialization();

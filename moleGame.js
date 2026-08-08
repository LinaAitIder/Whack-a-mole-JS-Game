// Some global variables
let currentMole;
let currentChamp;
let moleNums = 0;
let latestBestScore = 0;
let currentBestScore = 0;
let score = 0;
const startingMinutes= 1;
let time =  startingMinutes*60;
const cursor = document.querySelector('.cursor');
const timer = document.getElementById('timer');
var startAudio = new Audio('assets/game-start.mp3');
var gameOverAudio = new Audio('assets/game-over.mp3');
var treeAudio = new Audio('assets/tree-shaking.wav');
var trumphAudio = new Audio('assets/achievement.mp3');
var lostAudio = new Audio('assets/lost.mp3');
let refreshIntervalCounterId ;
let refreshIntervalMoleDisplayId;
let gameFinished = false;


// Initiate Window
window.onload = function(){
 
 let initialWindow=document.createElement("div");
 let playBtn = document.createElement("button");
 let playText = document.createElement("p");

  initialWindow.className="initialWindow";
  playText.style.fontSize = "20px"
  playText.style.margin = "0px"
  playText.style.padding = "10px";

  playBtn.className="playBtn";
  playText.innerHTML ="PLAY ";

  playBtn.appendChild(playText);
  initialWindow.appendChild(playBtn)
  document.body.appendChild(initialWindow);

  playBtn.addEventListener("click",()=>{
    initialWindow.style.display="none";
    initiateGame();
  })

}

//Initializing the game
function initiateGame(){
  startAudio.play();
  document.body.style.cursor="none";
  createBoard();
  refreshIntervalCounterId =setInterval(countDownTimer, 1000);
  refreshIntervalMoleDisplayId=setInterval(randomMoleDisplay,2000);  
}

//Creating the board
function createBoard(){
  let bestScore = localStorage.getItem("bestScore");
  if (bestScore) {
    document.getElementById("bestScore").innerText = "BEST SCORE: " + bestScore;
  } else {
    document.getElementById("bestScore").innerText = "BEST SCORE: 0";
  }
  let boardDiv = document.getElementById("board");
  for(let i=0;i<3;i++){
    let childDiv = document.createElement("div");
    childDiv.id = i.toString();
    boardDiv.appendChild(childDiv);
  }
}

//Displaying the mole
let randomMoleDisplay = ()=>{
  if(currentMole){
    currentMole.innerHTML="";
  }
  if(currentChamp){
    currentChamp.innerHTML="";
  }
  let moleImg = document.createElement("img");
  let champImg = document.createElement("img")
  let MoleDivId = randomId();
  let ChampDivId = randomId();


  moleImg.src="assets/mole.png";
  moleImg.className="mole";
  champImg.src="assets/champ.png"
  champImg.className="champ";
  
  currentMole=document.getElementById(MoleDivId); 
  currentChamp=document.getElementById(ChampDivId);
  if(MoleDivId != ChampDivId){
    currentMole.appendChild(moleImg);
    currentChamp.appendChild(champImg)
  } 

  if (currentMole.childElementCount==1){
    moleImg.addEventListener("click", selectMole);
  }
  if(currentChamp.childElementCount==1){
    champImg.addEventListener("click", selectChamp)
  }
  setTimeout(removeMole,5000)
  setTimeout(removeChamp,5000)

}

//Removing the moleImage
function removeMole(){
  currentMole.innerHTML="";
}

function removeChamp(){
  currentChamp.innerHTML="";
}
//Generating random number
function randomId(){
  let randomNum=Math.floor(Math.random()*3);
  return randomNum.toString();
}

//Selecting the mole
function selectMole(){
  moleNums += 1;
  score = moleNums * 10;
  document.getElementById("score").innerText="SCORE: "+score.toString();
  currentMole.innerHTML="";
  let dizzyMoleImg =document.createElement('img');
  dizzyMoleImg.src="assets/moleAttacked.png";
  dizzyMoleImg.className="dizzyMole";
  currentMole.appendChild(dizzyMoleImg);
  trumphAudio.play();
}

//selecting the champ
function selectChamp(){
  lostAudio.play();
  // Wrong target does not change the mole hit count.
  // The score is always calculated from the moles hit.
  currentChamp.innerHTML = "";
}

//Handling the bestscore logic
function handlingBestScore(){
  const storedBestScore = Number.parseInt(localStorage.getItem("bestScore"), 10);

  latestBestScore = Number.isNaN(storedBestScore) ? 0 : storedBestScore;
  newScore = moleNums * 10;
  if (newScore> latestBestScore) {
    latestBestScore = moleNums * 10;
    localStorage.setItem("bestScore", String(moleNums));
  }

  currentBestScore = latestBestScore;
}


//displayOverlay func
function displayOverlay(){
  if (gameFinished) {
    return;
  }

  gameFinished = true;

  //Stop both async loops before constructing the overlay.
  clearInterval(refreshIntervalCounterId);
  clearInterval(refreshIntervalMoleDisplayId);

  handlingBestScore();
  gameOverAudio.play();

  let gameEndedWindow = document.createElement("div");
  let windowContent = document.createElement("div");
  
  gameEndedWindow.className="endGameWindow";
  windowContent.className="windowContent";
 
  windowContent.innerHTML = `<h1>You've Hit ${moleNums} Moles!</h1>`;
  windowContent.innerHTML += `<p>BEST SCORE : ${currentBestScore}</p>`;
  windowContent.innerHTML += `<p>YOUR SCORE : ${score}</p>`;
  windowContent.innerHTML += "<button class='restartBtn'>Restart</button>";
  
  gameEndedWindow.appendChild(windowContent);
  document.body.appendChild(gameEndedWindow);

  let restartBtn = document.querySelector('.restartBtn');
  restartBtn.addEventListener("click",()=>{
    location.reload();
  });
}

//Verify we can get to the cursor element
if(!cursor){
  console.log("cursor element not detected");
}
//Managing Cursor Element to follow mouse mouvement
window.addEventListener('mousemove', (m) => {
  cursor.style.top = m.pageY + 'px';
  cursor.style.left = m.pageX + 'px';
})

//Managing cursor Image when clicked or not
window.addEventListener('mousedown' , ()=>{
  cursor.classList.add('active');
})
window.addEventListener('mouseup', ()=>{
  cursor.classList.remove('active');
})

//Managing Audio , additional effects for the right tree 
let rightTree=document.querySelector('.rightTree');
rightTree.addEventListener("mouseover",()=>{
  treeAudio.play();
})

//CountDown Timer
function countDownTimer(){
  if (time <= 0) {
    displayOverlay();
    return;
  }

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  timer.style.alignItems = "center";
  timer.style.backgroundColor = "white";
  timer.style.color = "Black";
  timer.style.borderRadius = "20px";
  timer.style.padding = "10px";
  timer.style.margin = "10px";
  timer.style.fontSize = "20px";

  const displayMinutes = String(minutes).padStart(2, '0');
  const displaySeconds = String(seconds).padStart(2, '0');
  timer.innerHTML = `${displayMinutes}:${displaySeconds}`;

  time -= 1;

  if (time <= 0) {
    time = 0;
    timer.innerHTML = "00:00";
    displayOverlay();
  }
}



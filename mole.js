// Some global variables
let currentMole;
let currentChamp;
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
var refreshIntervalId ;



// Initiate Window
window.onload = function(){
 
 let initialWindow=document.createElement("div");
 let playBtn = document.createElement("btn");
 let  playText = document.createElement("p");

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
  setInterval(countDownTimer, 1000);
  setInterval(randomMoleDisplay,2000);  
}

//Creating the board
function createBoard(){
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
  score +=10;
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
  if(score == 0){
    displayGameOverWin();
  } else {
    lostAudio.play();
    score -= 10;
    document.getElementById("score").innerText="SCORE: "+score.toString();
  }

}

//gameOver function
function displayGameOverWin(){
    gameOverAudio.play();
    let gameOverWindow = document.createElement("div");
    gameOverWindow.className="gameOverWindow";
    gameOverWindow.style.display="flex";
    gameOverWindow.style.transition="4s";

    let gameOverDiv = document.createElement("div");
    gameOverDiv.style.display="flex";
    gameOverDiv.style.flexDirection="column";
    gameOverDiv.style.gap="10px"

    gameOverDiv.innerHTML = "<h1>GAME OVER!</h1>";
    gameOverDiv.innerHTML += "<button class='backBtn'>Back</button>";

    
    gameOverWindow.appendChild(gameOverDiv);
    document.body.appendChild(gameOverWindow);

    let backBtn = document.querySelector('.backBtn');
    backBtn.addEventListener("click",()=>{
      location.reload();
    });

    //Reinitiate Timer
    clearInterval(refreshIntervalId);
}

//display final window
function displayFinalWin(){
  let bestScore=localStorage.getItem("bestScore");
  if(bestScore=='undefined'){
    bestScore = 0;
  }
  if(score>bestScore){
    localStorage.setItem("bestScore",score);
  }

  gameOverAudio.play();
  let gameOverWindow = document.createElement("div");
  gameOverWindow.className="gameOverWindow";
  gameOverWindow.style.display="flex";
  gameOverWindow.style.transition="4s";

  let gameOverDiv = document.createElement("div");
  gameOverDiv.style.display="flex";
  gameOverDiv.style.flexDirection="column";
  gameOverDiv.style.gap="10px"

  gameOverDiv.innerHTML = `<h1>You've Hit ${score/10} Moles!</h1>`;
  gameOverDiv.innerHTML += `BEST SCORE : ${bestScore}`;
  gameOverDiv.innerHTML += "<button class='backBtn'>Back</button>";

  
  gameOverWindow.appendChild(gameOverDiv);
  document.body.appendChild(gameOverWindow);

  let backBtn = document.querySelector('.backBtn');
  backBtn.addEventListener("click",()=>{
    location.reload();
  });

  //Reinitiate Timer
  clearInterval(refreshIntervalId);
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
  const minutes=Math.floor(time/60);
  let seconds = time % 60;
  seconds = seconds<10 ? '0'+seconds : seconds;
  timer.style.alignItems="center";
  timer.style.backgroundColor="white";
  timer.style.color="Black";
  timer.style.borderRadius="20px";
  timer.style.padding="10px";
  timer.style.margin="10px";
  timer.style.fontSize="20px";
  timer.innerHTML= `0${minutes}:${seconds}`;
  time--;
  if(seconds==0 && minutes==0){
    displayFinalWin();
  }
}


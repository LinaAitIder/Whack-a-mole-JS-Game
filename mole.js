// Some global variables
let currentMole;
let score = 0;
let gameOver = false;
const cursor = document.querySelector('.cursor');

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
  playText.innerHTML="PLAY"

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
  document.body.style.cursor="none";
  createBoard();
  setInterval(randomMoleDisplay,2000);  
 // displayresultWindow();
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
  let moleImg = document.createElement("img");
  let randomDivId = randomId();

  moleImg.src="assets/mole.png";
  moleImg.className="mole";
  
  currentMole=document.getElementById(randomDivId); 
  currentMole.appendChild(moleImg);
  if (currentMole.childElementCount==1){
    moleImg.addEventListener("click", selectMole);
  }
  setTimeout(removeMole,1000)

}

function removeMole(){
  currentMole.innerHTML="";

}
//Generating random number
function randomId(){
  let randomNum=Math.floor(Math.random()*3);
  return randomNum.toString();
}

//Selecting the mole
function selectMole(){

  score +=10;
  document.getElementById("score").innerText=score.toString();
  currentMole.innerHTML="";
  let dizzyMoleImg =document.createElement('img');
  dizzyMoleImg.src="assets/moleAttacked.png";
  dizzyMoleImg.className="dizzyMole";
  currentMole.appendChild(dizzyMoleImg);

 
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
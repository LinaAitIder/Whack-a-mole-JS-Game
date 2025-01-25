
let currentMole;
// Initiale Window
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



function initiateGame(){
  createBoard();
  setInterval(randomMoleDisplay,2000);  
}

function createBoard(){

  let boardDiv = document.getElementById("board");

  for(let i=0;i<3;i++){
    let childDiv = document.createElement("div");
    childDiv.id = i.toString();
    boardDiv.appendChild(childDiv);
  }
}


let randomMoleDisplay = ()=>{

  if(currentMole){
    currentMole.innerHTML="";
  }
  let moleImg = document.createElement("img");
  let randomDivId = randomId();

  moleImg.src="assets/mole.png";
  
  currentMole=document.getElementById(randomDivId); currentMole.appendChild(moleImg);
}

function randomId(){
  let randomNum=Math.floor(Math.random()*3);
  return randomNum.toString();
}

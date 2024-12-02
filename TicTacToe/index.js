// Tik Tak Toe APP

// initialization 
const boxes = document.querySelectorAll('.box');
const  gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector(".btn");


let currentPlayer ;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// initialize game
function initGame() {
    //current player
    currentPlayer = 'X';
    //initially grid is empty 
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box ,index) => { 
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
    });

    // remove green color from the boxes
    boxes.forEach((box) => {
        box.classList.remove("win");
    });
    //hide the new game button
    newGameBtn.classList.remove("active");
    //update the game info , show the current status of the current palyer 
    gameInfo.innerText = `Current Palyer - ${currentPlayer}`;

}

initGame();



// swap turn 
function swapTurn(){
    if(currentPlayer == "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    // update UI 
    gameInfo.innerText = `current Player - ${currentPlayer}`;

}


function checkGameOver(){
    let answers = "";
    winningPositions.forEach((position) => {
        //check if the game grid has the same value in the winning position and non empty
    if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
     && (gameGrid[position[0]]=== gameGrid[position[1]]) && (gameGrid[position[1]]=== gameGrid[position[2]])){
    
        if(gameGrid[position[0]] === "X"){
            answers = "X";
        }
        else{
            answers = "O";
        }

        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        })

        //now we can  know X or O is winner 
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }

});

//it means we have a winner 
    if (answers !== "") {
        gameInfo.innerText = `${answers} is the winner!`;
        newGameBtn.classList.add("active");
        return;
    }

    //check weather the board is filled or tied
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });

    //board is filled or tied 

    if(fillCount === 9){
    gameInfo.innerText = "It's a tie!";
    newGameBtn.classList.add("active");
    return;
    }

}
  
// handleClick 
  function handleClick(index) {
    if(gameGrid[index]===""){    //if the box is empty
        boxes[index].innerText = currentPlayer; //for UI update
        gameGrid[index] = currentPlayer; //for game logic
        boxes[index].style.pointerEvents = "none";
        // swap turn X to O short form 
        // currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        swapTurn();
        // check winner
        checkGameOver();

    }
}

boxes.forEach((box ,index) =>{
    box.addEventListener('click', () => {
        handleClick(index);
    })

});

newGameBtn.addEventListener('click', initGame);

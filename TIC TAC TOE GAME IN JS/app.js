//{ TIC TAC TOE IN JS }

//[ WINNING PATTERN]
//( HORIZONTAL ) --- 012, 345, 678
//( VERTICAL ) --- 036, 147, 258
//( DIAGONAL ) --- 048, 246
//NOTE; THERE ARE 8 WINNING POINTS

// {MAKING THE GAME}

// FIRST ACCESS THE REQUIRED ELEMENTS AND THEN STORE THEM IN VARIABLES
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

//( WE NEED DIFFERENT TURNS SO)

let turnO = true; //PLAYER X AND Y

//( STORING WINNING PATTERNS )

// let arr = ["apple","bannana","Litchi"] // 1D ARRAY
// //{ note: 2D ARRAYS //THE ARRAY OF ARRAYS}
// let arr2 = [["apple","bannana"],["chicken","lamb"],["pant","shirt"]]
// // note: arr2[0] IS USED TO ACCESS THE FIRST ARRAY
// // NOTE: arr2[0][0] IS USED TO ACCESS THE FIRST ELEMENT OF THE FIRST ARRAY

const winPatterns = [
  //( START WITH PATTERNS THHAT START WITH 0 AND THEN MOVE ON TO THE NEXT)
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
//{NEW FUNCTIONS FOR RESET GAME AND NEW GAME }
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};
let moveCount = 0;
//[ WE ADD EVENT LISTNER FOR EACH BOXES USING LOOPS]
boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    console.log("Clicked");
    moveCount++;
    console.log("MoveCount =", moveCount);
    // if(turnO) and if(turnO === true MEANS THE SAME THING)
    // WHEN THE BUTTON IS CLICKED IT CHECKS IF ITS O'S  TURN IF TRUE THEN IT PRINTS 0 AND MAKES TURN0 TO FALSE.. SO NOW IT BECOMES X TURN
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    //( WE CAN CHANGE THE X TO O IF IT IS CLICKED ON AGAIN SO TO STOP IT WE  NEED TO DISABLE THE BUTTON ONCE IT IS ACESSED )
    box.disabled = true;
    //CHECKS FOR THE WINNER AFTER THE ADDING OF ONE INPUT
    checkWinner();
  });
});
//{ FUNCTION TO DISABLE BOXES AFTER THE WINNER IS FOUND }
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

//{ FUNCTION TO ENABLE BOXES FOR THE NEW GAME  }
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const draw = () => {
  msg.innerText = "It's a draw!";
  msgContainer.classList.remove("hide");
  moveCount = 0;
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, The Winner is ${winner} `;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
const checkWinner = () => {
  let winnerFound = false;
  for (let pattern of winPatterns) {
    //NOTE: THE BELOW GIVES THE POSITION FOR WHICH IT IS CHECKED
    //NOW SINCE ALL THE BUTTONS ARE IN THE BOXES WE CHECK THE BOXES
    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(boxes[pattern[0]].innerText, //[ THIS IS POSITION 1]
    //             boxes[pattern[1]].innerText, //[ THIS IS POSITION 2]
    //             boxes[pattern[2]].innerText  //[ THIS IS POSITION 3]
    // );

    //{ THIS IS THE  MAIN BLOCK OF CODE }
    let pos1Val = boxes[pattern[0]].innerText; //GIVES THE LETTERS OR INPUT IN EACH POSITIONS
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    //NOTE: WINNING CONDITION ( MUST NOT BEE EMPTY AND ALSO ALL THREE VALUES MUST BE EQQUAL)
    //[ NOW WHWNEVER THE PATTERN IS MATCHED WINNER IS PRINTED]
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        winnerFound = true;
        console.log("WINNER", pos1Val); //[ WINNER IS PRINTED ]
        showWinner(pos1Val); // ( THIS FUNCTION IS USED TO SHOW WINNER)
        //note: THE VALUE AT POS1 IS PASSED AS AN IMPUT TO THE SJOW WINNER FUNCTION
        break; //[ STOP CHECKING ONCE THE WINNER IS FOUND ]
      }
      if (moveCount === 9 && !winnerFound) {
        draw();
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

//IMPLEMENT DRAW CONDITION
//THRACK WHEN THERE IS NO WINNER
//IN THIS CASE PRINT A DIFFERENT MSG IN THE MSG P
// USE VARCOUNT WHEN THE COUNT BUTTON CLICKS WHEN THE TOTAL COUNT REACHES 9 BUT THERE IS  NO WINNER, THAT MEANS THE GAME IS DRAW

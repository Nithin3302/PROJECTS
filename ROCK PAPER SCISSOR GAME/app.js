let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorPara = document.querySelector('#user-score');
const compScorPara = document.querySelector('#comp-score');

const genCompChoice = () =>{
    //COMP MUST RANDOMLY GENERATE BETWEEN THE THREE CHOICE
    const options = ["rock","paper","scissors"];
    //MATH.RANDOM GENERATES A RANDOM NUMBER BETWEEEN 0 AND 1
    //WE MULTIPLY IT BY 3 BECAUSE WE HAVE 3 OPTIONS
    //WE NEED A NUMBER BBETWEEN 0 AND 2 SO WE MULTIPLY IT  BY 2
    //IF WE NEED BETWEEN 9 WE MULTIPLY IT BY 10 
    //MATH.FLOOR IS USED TO ROUND UP DECIMAL VALUES 
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];

}
const drawGame = ()=>{
    console.log('GAME WAS DRAW');
    msg.innerText = "GAME WAS DRAW"
    msg.style.backgroundColor = "grey"
  
}

const showWinner = (userWin,userChoice,compChoice) =>{
    if(userWin){
        userScore++;
        userScorPara.innerText = userScore;
        console.log("YOU WIN");  
        msg.innerText = `YOU WIN! Your ${userChoice} beats ${compChoice}`
        msg.style.backgroundColor = "green"
    } else{
        compScore++;
        compScorPara.innerText = compScore;
        console.log('YOU LOSE');
        msg.innerText = `YOU LOST! ${compChoice} beats your ${userChoice}`
        msg.style.backgroundColor = "red"
    }
}
//THIS IS FOR COMPUTER
const playgame = (userChoice) => {
    console.log('user choice = ',userChoice);
    //GENERATING COMPUTERS CHOICE
    const compChoice = genCompChoice();
    console.log('comp choice = ',compChoice);

    if(userChoice === compChoice){
        //DRAW CONDITION
        drawGame();
    } else {
        let userWin = true;
        if(userChoice === "rock"){
            //COMP CHOICE CAN BE SCISSOR PAPER
            //IF ROCK IT GOES TO DRAW CONDITION
            //IF COMP CHOICE IS PAPER THEN USER LOSES ELSE WINS
            userWin = compChoice === "paper" ? false : true;
        } else if(userChoice === "paper") {
            //ROCK SCISSORS
            userWin = compChoice === "scissors" ? false : true;
        } else {
            //SCISSOR FOR USER
            //COMP HAS ROCK, PAPER
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
}

// THIS IS FOR GETTIG THE SELECTED CHOICE
choices.forEach((choice) => {
    // console.log(choices);
    
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        console.log('Choice was clicked',userChoice);  
        playgame(userChoice);
    });
});
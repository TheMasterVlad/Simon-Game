let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;
let clickedButton;
let audio;

const turnCounter = document.querySelector('#turn');
const topLeftUpper = document.querySelector('#topleftupper');
const topLeftLower = document.querySelector('#topleftlower');
const topRightUpper = document.querySelector('#toprightupper');
const topRightLower = document.querySelector('#toprightlower');
const bottomLeftUpper = document.querySelector('#bottomleftupper');
const bottomLeftLower = document.querySelector('#bottomleftlower');
const bottomRightUpper = document.querySelector('#bottomrightupper');
const bottomRightLower = document.querySelector('#bottomrightlower');
const onButton = document.querySelector('#on');
const strictButton = document.getElementById('strict');
const startButton = document.querySelector('#start');
const strictOnImage = "https://i.ibb.co/jykpcZ6/strict-on.png";
const strictOffImage = "https://i.ibb.co/CPr3ZQc/strict-off.png";
const powerOnImage = "https://i.ibb.co/2ZvcgXF/power-on.png";
const powerOffImage = "https://i.ibb.co/NsJyq7F/power-off.png";

strictButton.addEventListener('click', (event) => {
	if (strictButton.src == strictOffImage){
		strict = true;
		strictButton.src = strictOnImage;
	} else{
		strict = false;
		strictButton.src = strictOffImage;
	}
});

onButton.addEventListener('click', (event) => {
	if (onButton.src == powerOffImage)
	{
		onButton.src = powerOnImage;
		on = true;
		turnCounter.innerHTML = '-';
	} else{
		on = false;
		clearInterval(intervalId);
		onButton.src = powerOffImage;
		turnCounter.innerHTML = '';
		clearColor();
	}
});

startButton.addEventListener('click', (event) => {
	if(on || win){
		play();
	}
});

topLeftUpper.addEventListener('click', (event) => {
	if(on && !compTurn && !isNaN(turn)){
		clickedButton = 1;
		animateButtonPress(clickedButton);
	}
});

topLeftLower.addEventListener('click', (event) => {
	if(on && !compTurn && !isNaN(turn)){
		clickedButton = 2;
		animateButtonPress(clickedButton);
	}
});

topRightUpper.addEventListener('click', (event) => {
	if(on && !compTurn && !isNaN(turn)){
		clickedButton = 3;
		animateButtonPress(clickedButton);
	}
});

topRightLower.addEventListener('click', (event) => {
	if(on && !compTurn && !isNaN(turn)){
		clickedButton = 4;
		animateButtonPress(clickedButton);
	}
});

bottomLeftUpper.addEventListener('click', (event) => {
	if(on && !compTurn && !isNaN(turn)){
		clickedButton = 5;
		animateButtonPress(clickedButton);
	}
});

bottomLeftLower.addEventListener('click', (event) => {
	if(on && !compTurn && !isNaN(turn)){
		clickedButton = 6;
		animateButtonPress(clickedButton);
	}
});

bottomRightUpper.addEventListener('click', (event) => {
	if(on && !compTurn && !isNaN(turn)){
		clickedButton = 7;
		animateButtonPress(clickedButton);
	}
});

bottomRightLower.addEventListener('click', (event) => {
	if(on && !compTurn && !isNaN(turn)){
		clickedButton = 8;
		animateButtonPress(clickedButton);
	}
});

function animateButtonPress(pressedButton){
	playerOrder.push(pressedButton);
	
	if(playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]){
		wrongAction();
	}
	
	if(playerOrder.length == 20 && good){
		winGame();
	}
	
	if(turn == playerOrder.length && good && !win){
		turn++;
		turnCounter.innerHTML = turn;
		startNewGame();
	}

	flashButton(pressedButton);
	clearColorTimeout();
}

function play(){
	win = false;
	order = [];

	intervalId = 0;
	turn = 1;
	turnCounter.innerHTML = 1;
	
	for(let i = 0; i < 20; i++){
		order.push(Math.floor(Math.random() * 8) + 1);
	}
	
	startNewGame();
}

function gameTurn(){
	on = false;
	
	if(flash == turn){
		clearInterval(intervalId);
		compTurn = false;
		clearColor();
		on = true;
	}
	
	if(compTurn){
		clearColor();
		setTimeout(() => {
			flashButton(order[flash]);
			flash++;
		}, 200);
	}
}

function startNewGame(){
	compTurn = true;
	flash = 0;
	good = true;
	playerOrder = [];
	intervalId = setInterval(gameTurn, 500);
}

function flashButton(clickedButton){
	playNoise(clickedButton);
	switch(clickedButton) {
		case 1: topLeftUpper.style.backgroundColor = "orchid"; break;
		case 2: topLeftLower.style.backgroundColor = "deepskyblue"; break;
		case 3: topRightUpper.style.backgroundColor = "lime"; break;
		case 4: topRightLower.style.backgroundColor = "orange"; break;
		case 5: bottomLeftUpper.style.backgroundColor = "peru"; break;
		case 6: bottomLeftLower.style.backgroundColor = "yellow"; break;
		case 7: bottomRightUpper.style.backgroundColor = "red"; break;
		case 8: bottomRightLower.style.backgroundColor = "slategray"; break;
	}
}

function playNoise(pressedButton){
	if(noise){
		document.getElementById("clip" + pressedButton).play();
	}
	noise = true;
};

function clearColorTimeout(){
	if(!win){
		setTimeout(() => {
			clearColor();
		}, 300);
	}
}

function clearColor(){
	topLeftUpper.style.backgroundColor = "purple";
	topLeftLower.style.backgroundColor = "darkblue";
	topRightUpper.style.backgroundColor = "darkgreen";
	topRightLower.style.backgroundColor = "chocolate";
	bottomLeftUpper.style.backgroundColor = "saddlebrown";
	bottomLeftLower.style.backgroundColor = "goldenrod";
	bottomRightUpper.style.backgroundColor = "darkred";
	bottomRightLower.style.backgroundColor = "darkslategray";
}

function flashColor(){
	on = false;
	topLeftUpper.style.backgroundColor = "orchid";
	topLeftLower.style.backgroundColor = "deepskyblue";
	topRightUpper.style.backgroundColor = "lime";
	topRightLower.style.backgroundColor = "orange";
	bottomLeftUpper.style.backgroundColor = "peru";
	bottomLeftLower.style.backgroundColor = "yellow";
	bottomRightUpper.style.backgroundColor = "red";
	bottomRightLower.style.backgroundColor = "slategray";
}

function wrongAction(){
	good = false;
	flashColor();
	turnCounter.innerHTML = "NO!";
	setTimeout(() => {
		turnCounter.innerHTML = turn;
		clearColor();
		
		if(strict){
			play();
		} else{
			startNewGame();
		}
	}, 800);
	noise = false;
}

function winGame(){
	flashColor();
	turnCounter.innerHTML = "WIN!";
	on = false;
	win = true;
}
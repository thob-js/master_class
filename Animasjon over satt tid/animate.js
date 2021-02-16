sconst AUDIO = document.querySelector("#sound2s");
const OPTIONS = document.querySelector("#dropdown");
const BTN_OPTIONS = document.querySelector("#dropdownBTN");


const canvas = document.querySelector('#can1');
const context = canvas.getContext('2d');

var dropdownValue = 0;
var b;
var h;
var rectB = 0;
var rectH = 0;

function getUserInput() {
    dropdownValue = OPTIONS.value;
    RemoveChosenOption();
}


function RemoveChosenOption() {
    if (OPTIONS.length > 0) {
        let x = OPTIONS;
         x.remove(x.selectedIndex);
    } else {
        window.alert("Du er tom for valg");
    }
}

function playSound() {
    AUDIO.currentTime = 0;
    AUDIO.play();
}

function init(){
    if (canvas && canvas.getContext) { 
        window.requestAnimationFrame(gameLoop);
    }
}


var timer = 0;
let ms = 0;
let oldTimeStamp = 0;

function gameLoop(timeStamp) {
    // Tid siden siste loop i sekunder
    ms = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    ms = Math.min(ms, 0.1);

    timer += ms;

    // Send timer til update
    if (timer < 2) {
        update(ms);
        window.requestAnimationFrame(gameLoop);
    } else {
        console.log("Timer: "+timer,"B: "+b,"H: "+h);
        timer == 0;
        AUDIO.pause();
    }
}

function update() {
    b = dropdownValue;
    h = 10-(dropdownValue);
    rectB = (timer*b)*24;
    rectH = (timer*h)*24;
    draw(b, h);
}

function draw(b, h) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    //rektangel
    context.fillStyle = 'coral';
    context.fillRect(50, 50, rectB, rectH);
    context.stroke();
    
    //tekst
    context.fillStyle = 'white';
    context.font = "14px Arial";
    context.fillText("Omkrets = ("+h+" + "+b+") * 2 = 20", 50, 40);
    context.fillText("H = "+h, 13, rectH+45);
    context.fillText("B = "+b, rectB+16, rectH+62);
}

BTN_OPTIONS.addEventListener('click', btn1functions);
function btn1functions() {
    init();
    getUserInput();
    timer = 0;
    playSound();
    window.requestAnimationFrame(gameLoop);
}
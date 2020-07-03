const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();


console.log('Number:',randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


let recogninition = new window.SpeechRecognition;

// start recognition and game
recogninition.start();

// capture user speak
function onSpeak(e) {
const msg = e.results[0][0].transcript;

 writeMessage(msg);
 checkNumber(msg);
}

// write what user speaks
function writeMessage(msg) {
    msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
    `;
}
// check msg against number
function checkNumber(msg) {
    const num = +msg;

    //Check if valid number
    if(Number.isNaN(num)) {
        msgEl.innerHTML = '<div> That is not a valid number </div>';
        return;
    }

    //check the range of numbers
    if (num > 100 || num < 1) {
        msgEl.innerHTML += `<div> number must be between 1-100 </div>`;
        return;
    }

    //check number
    if(num === randomNum) {
        document.body.innerHTML = `
        <h2> Congrats! You have guessed the right number <br/>
        It was ${num}!</h2>
        <button class="play-again" id="play-again">Play Again!</button>
        `;
    } else if (num > randomNum) {
        msgEl.innerHTML += `<div>GO LOWER</div>`;
    } else {
        msgEl.innerHTML += `<div> GO HIGHER</div>`;
    }
}

// generate random number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// speak result
recogninition.addEventListener('result', onSpeak);

// end SR service
recogninition.addEventListener('end', ()=> {
    recogninition.start();
});

document.body.addEventListener('click', (e)=> {
    if(e.target.id == 'play-again') {
        window.location.reload();
    }
})
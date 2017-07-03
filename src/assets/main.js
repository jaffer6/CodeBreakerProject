let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let userguess = document.getElementById('user-guess');
let results = document.getElementById('results');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value === '' || attempt.value === '') {
        setHiddenFields();
    }
    if (!validateInput(input.value)) {
        document.getElementById('message').innerHTML = 'Guesses must be exactly 4 characters long.';
        return false;
    }
    else {
        attempt.value++;
    }

    if (getResults(userguess.value)) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    }
    else {
        if (attempt.value > 10) {
            setMessage("You Lose! :(")
            showAnswer(false);
            showReplay();
        }
        else {
            setMessage("Incorrect, try again.");
        }
    }
}

//implement new functions here
function setHiddenFields() {
    var a = Math.floor(Math.random() * 10000).toString();
    while (a.length < 4) {
        a = "0" + a;
    }

    answer.value = a;
    attempt.value = 0;
}

function setMessage(message) {
    let label = document.getElementById('message');
    label.innerHTML = message;
}

function validateInput(input) {
    if (input.length < 4) {
        return false;
    }
    return true;
}

function getResults(guess) {
    let correctGuesses = 0;
    let initial = '<div class="row"><span class="col-md-6">' + guess + '</span><div class="col-md-6">';
    for (var i = 0; i < guess.length; i++) {
        var character=guess[i]
        if (guess[i] === answer.value[i]) {
            correctGuesses++;
            initial += '<span class="glyphicon glyphicon-ok"></span>';            
        }
        else if (answer.value.indexOf(guess[i]) > -1) {
            initial += '<span class="glyphicon glyphicon-transfer"></span>'
        }
        else {
            initial += '<span class="glyphicon glyphicon-remove"></span>'
        }
    }

    initial += '</div>';
    results.innerHTML += initial;

    if (correctGuesses === guess.length) {

        return true;
    }
    else { return false;}
}

function showAnswer(won) {
    let codelabel = document.getElementById('code');
    codelabel.innerHTML = answer.value;
    if (won) {
        codelabel.className += ' success'
    }
    else {
        codelabel.className += ' failure';
    }
}

function showReplay() {
    let guessingdiv = document.getElementById('guessing-div');
    guessingdiv.style.display = 'none';

    let replaydiv = document.getElementById('replay-div');
    replaydiv.style.display = 'block';
}
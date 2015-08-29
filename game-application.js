/**
 * Created by sarah on 8/28/15.
 */
var textToDisplay = directions;
var turns_left = 5;

$(document).ready(function(){

    var answer = Math.floor((Math.random() * 100) + 1); // random number from 1 to 100;

    $("#display-text").text(textToDisplay);

//  OPTION BUTTONS ###############################################
    $("#dir-btn").on('click', function(){
        textToDisplay = directions;
        $("#display-text").text(textToDisplay);
    });

    $("#hist-btn").on('click', function(){
        if (guess_history.length == 0) {
            textToDisplay = no_hist_msg;
        }
        else {
            textToDisplay = "Your guess history: ";
            for (var i = 0; i < guess_history.length; i++){
                textToDisplay += guess_history[i].guess;
                textToDisplay += " - ";
                textToDisplay += guess_history[i].temp;
                textToDisplay += "; ";
            }
            textToDisplay = textToDisplay.slice(0, textToDisplay.length - 2);
        }

        $("#display-text").text(textToDisplay);
    });

    $("#ans-btn").on('click', function(){
        textToDisplay = answer_msg;
        textToDisplay += answer;
        $("#display-text").text(textToDisplay);
    });

    $("#res-btn").on('click', function(){
        guess_history = [];
        answer = Math.floor((Math.random() * 100) + 1);
        turns_left = 5;
        textToDisplay = restart_msg;
        $("#display-text").text(textToDisplay);
        $("#game-status").removeClass("lost");
        $("#game-status").removeClass("won");
        $("#game-status").addClass("playing");
        // TODO Reset progress bar
    });

//  INPUT FORM ##################################################
    $("#guess-btn").on('click', function(){
    // TODO Make [ENTER] also work to submit value
        var guess = $("#inputNum").val();
        var guess_obj = {
            guess: guess,
            temp: "starting temp"
        }

        // Validate input for number between 1 - 100, & not previously guessed
        if (notGuessedYet(guess, guess_history) && validNumber(guess)) {

            turns_left--;

            if (guess == answer) {
                textToDisplay = won_msg;
                $("#display-text").text(textToDisplay);
                $("#game-status").addClass("won");
                $("#game-status").removeClass("playing");
            }

            else if (turns_left === 0) {
                textToDisplay = lost_msg;
                $("#display-text").text(textToDisplay);
                $("#game-status").addClass("lost");
                $("#game-status").removeClass("playing");
            }

            // determine starting temperature
            else {

                if (guess_history.length === 0){
                    textToDisplay = higherLower(answer, guess);
                    $("#display-text").text(textToDisplay);
                }
            // or check temperature based on previous guess
                else {
                    textToDisplay = "You guessed ";
                    textToDisplay += guess;
                    textToDisplay += ". ";

                    if (hotterColder(answer, guess, guess_history[guess_history.length - 1].guess)){
                        textToDisplay += warm_msg;
                        guess_obj.temp = "hotter";
                        textToDisplay += higherLower(answer, guess);
                    }
                    else {
                        textToDisplay += chilly_msg;
                        guess_obj.temp = "colder";
                        textToDisplay += higherLower(answer, guess);
                    }
                    $("#display-text").text(textToDisplay);
                }

            }
            guess_history.push(guess_obj);
            // TODO Update progress bar
        }
        else {
            if (!validNumber(guess)) {
                textToDisplay = invalid_num_msg;
                $("#display-text").text(textToDisplay);
            }
            else {
                textToDisplay = previous_guessed_msg;
                $("#display-text").text(textToDisplay);
            }
        }
    });

});

//  HELPER FUNCTIONS ##############################################

var higherLower = function(ans, guess) {
    // Determines whether next guess should be higher or lower.
    if (guess < ans) {
        return higher_msg;
    }
    else return lower_msg;
};

var hotterColder = function(ans, guess, prev_guess) {
    // Determines whether guess is closer to answer than previous guess. Returns true for warmer, false for colder.
    if (Math.abs(ans - guess) < (Math.abs(ans - prev_guess))) {
        return true;
    }
    else {
        return false;
    }
}

var notGuessedYet = function(guess, guess_array){
    for (var i = 0; i < guess_array.length; i++){
        if (guess_array[i].guess === guess) {
            return false;
        }
    }
    return true;
}

var validNumber = function(guess) {
    if (guess <= 100 && guess >= 1) {
        return true;
    }
    else return false;
}




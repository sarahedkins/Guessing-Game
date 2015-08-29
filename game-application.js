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
                textToDisplay += guess_history[i];
                textToDisplay += ", ";
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
    });

//  INPUT FORM ##################################################
    $("#guess-btn").on('click', function(){
        var guess = $("#inputNum").val();
        turns_left--;

        if (guess === answer) {
            textToDisplay = won_msg;
            $("#display-text").text(textToDisplay);
            $(".playing").changeClass(".won");
        }

        else if (turns_left === 0) {
            textToDisplay = lost_msg;
            $("#display-text").text(textToDisplay);
            $(".playing").changeClass(".lost");
        }

        // function to determine hot/warm/chilly/cold
        else {

            if (guess_history.length === 0){
                textToDisplay = determineTemp(answer, guess);
                $("#display-text").text(textToDisplay);
            }

            else {
                textToDisplay = hotterColder(answer, guess, guess_history[guess_history.length - 1]);
                $("#display-text").text(textToDisplay);
            }

        }
        guess_history.push(guess);
    });

});

var determineTemp = function(ans, guess) {
    // Do not call this function if ans === guess.
    // Determines whether a guess is hot/warm/chilly/cold.
    var diff = Math.abs(ans - guess);

    if (diff <= 10 ) {
        return hot_msg;
    }
    else if (diff >= 80) {
        return cold_msg;
    }
    else return luke_warm_msg;
};

var hotterColder = function(ans, guess, prev_guess) {
    // Do not call this function if ans === guess, guess cannot === prev_guess
    // Determines whether guess is closer to answer than previous guess.
    if (Math.abs(ans - guess) < (Math.abs(ans - prev_guess))) {
        if (textToDisplay === warm2_msg) {
            return warm3_msg;
        }
        else if (textToDisplay === warm_msg){
            return warm2_msg;
        }
        else {
            return warm_msg;
        }
    }
    else {
        if (textToDisplay === chilly2_msg){
            return chilly3_msg;
        }
        else if (textToDisplay === chilly_msg){
            return chilly2_msg;
        }
        else {
            return chilly_msg;
        }
    }
}




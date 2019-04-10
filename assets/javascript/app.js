
$(document).ready(function () {

    var questions = [
        {
            question: "How did Daenerys Targaryen eventually hatch her dragon egg?",
            choice: ["In a lightnight storm", "In a funderal pyre", "In a fireplace", "In a frozen cafe"],
            answer: 1,
            image: ['assets/images/image1.png'],

        },

        {
            question: "The phrase 'Valar Morghulis' or 'all men must die' is usually responded with:",
            choice: ["Valar Dohaeris or 'all men must serve'", "Valar Rohnas or 'all men must live'", "Valar GoGo or 'all men must dance'"],
            answer: 0,
            image: ['assets/images/image2.png'],
        },

        {
            question: "Besides dragonglass, what is the only other substance capable of defeating the White Walkers?",
            choice: ["Weirwood", "Wildfire", "Valyrian Steel", "Snowballs"],
            answer: 2,
            image: ['assets/images/image3.png'],
        },

        {
            question: "How man times has Beric Dondarrion been brought back to life?",
            choice: ["Three Times", "Five Times", "Six Times", "Seven Times",],
            answer: 2,
            image: ['assets/images/image4.png'],
        },

        {
            question: "Arya's punishment for stealing from the Many-Face God is",
            choice: ["Death", "Memory Loss", "Uncontrollable laughter", "Blindness"],
            answer: 3,
            image: ['assets/images/image5.png'],
        },

    ];

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = questions.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];


    // hide the play again button
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < questions.length; i++) {
            holder.push(questions[i]);
        }
    })
    // start timer and decrement by 1 
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        //stop timer if reach 0 and show the correct answer
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }


    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    //pick a question from the object above and display it
    function displayQuestion() {

        index = Math.floor(Math.random() * questions.length);
        pick = questions[index];


        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //assign array position to it so can check answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);

        }




        $(".answerchoice").on("click", function () {

            userGuess = parseInt($(this).attr("data-guessvalue"));

            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");
                hidepicture();

            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
    }


    function hidepicture() {
        $("#answerblock").append("<img src= " + pick.image + ">");
        newArray.push(pick);
        questions.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answerblock").empty();
            timer = 20;


            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;

            } else {
                runTimer();
                displayQuestion();

            }
        }, 3000);


    }

    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            questions.push(holder[i]);
        }
        runTimer();
        displayQuestion();

    })

})
$(document).ready(function () {
    $("#startGame").on("click", gameStart);
    $(document).on("click", ".button", isRightAnswer);
    var defaultNum = 25;
    var i = 0;
    var wins = 0;
    var loss = 0;
    var newDiv;
    var questions = [
        { q1: "Where is Kratos from?", a1: "Sparta", c1: ["Sparta", "Greece", "Persia"], image: "assets/sparta.jpg" },
        { q1: "Who is Kratos son?", a1: "Atreus", c1: ["Brok", "Sindri", "Atreus", "Demos"], image: "assets/atreus.jpg" },
        { q1: "Who is Kratos' father?", a1: "Zeus", c1: ["Gaia", "Zeus", "Thor", "Odin"], image: "assets/Zeus.jpg" },
        { q1: "Who is the last giant?", a1: "Jormungandr", c1: ["Loki", "Freya", "Kratos", "Jormungandr"], image: "assets/jorm.jpg" },
        { q1: "What weapon does Kratos wield?", a1: "Leviathan Axe", c1: ["Nemean Cestus", "Blades of Chaos", "Blades of Exile", "Leviathan Axe"], image: "assets/leviathan.jpg" },
        { q1: "Who is the blue blacksmith?", a1: "Brok", c1: ["Brok", "Sindri", "Atreus", "Fafnir"], image: "assets/brok.jpg" }];
    function gameStart() {
        var questCont = $("<div></div>")
            .attr("class", "row");
        var questText = $("<div></div>")
            .attr("class", "col-12 text-center text-white");
        questText.text(questions[i].q1);
        questCont.html(questText);
        $("#container1").html(questCont);
        var timer = $("<div></div>")
            .attr("id", "timer");
        scoreKeep();
        $("#container1").append(timer);
        countDown = setInterval(timeCount, 1000);
        createButtons();
    }
    function scoreKeep() {
        var scoreCard1 = $("<div></div>")
            .attr("class", "col-6 text-center text-white")
            .text("Wins: " + wins);
        var scoreCard2 = $("<div></div>")
            .attr("class", "col-6 text-center text-white")
            .text("Losses: " + loss);
        var newDiv = $("<div></div>")
            .attr("class", "row");
        newDiv.append(scoreCard1, scoreCard2);
        $("#container1").append(newDiv);
    }
    function createButtons() {
        var buttonCont = $("<div></div>")
            .attr("class", "row");
        for (let k = 0; k < questions[i].c1.length; k++) {
            var choices = $("<div></div>")
                .attr({
                    "type": "button",
                    "data-value": questions[i].c1[k],
                    "class": "col-3 button rounded"
                })
                .text(questions[i].c1[k]);
            buttonCont.append(choices);
            $("#container1").append(buttonCont);
        }
    }
    function nextQuestion() {
        clearInterval(countDown);
        defaultNum = 25;
        i++;
        if (i > 5) {
            gameOver();
        }
        else {
            setTimeout(gameStart, 5000);
        }
    }
    function isRightAnswer() {
        console.log("heyo")
        if ($(this).attr("data-value") === questions[i].a1) {
            var rightText = $("<div>Correct!</div>")
                .attr("class", "col-12 text-center text-white");
            $("#container1").html(rightText);
            var rightImg = $("<img src='" + questions[i].image + "' alt='right img'>")
                .attr("class", "col-7 rounded mx-auto text-center d-block");
            $("#container1").append(rightImg);
            wins++;
            nextQuestion();
        }
        else {
            var wrongText = $("<div>Wrong Answer!</div>")
                .attr("class", "col-12 text-center text-white");
            var rightAnswer = $("<div>Correct Answer: " + questions[i].a1 + "</div>")
                .attr("class", "col-12 text-center text-white");
            $("#container1").html(wrongText);
            var image = $("<img src='assets/wrong.gif' alt='wrong'>")
                .attr("class", "col-7 rounded mx-auto text-center d-block");
            $("#container1").append(rightAnswer, image);
            nextQuestion();
            loss++;
        }
    }
    function timeCount() {
        if (defaultNum !== -1) {
            $("#timer")
                .text("Time remaining: " + defaultNum)
                .attr("class", "text-white text-center");
            defaultNum--;
            if (defaultNum === -1) {
                var outText = $("<div>Times Up!</div>")
                    .attr("class", "text-center text-white");
                $("#container1").html(outText);
                nextQuestion();
            };
        }
    }

})

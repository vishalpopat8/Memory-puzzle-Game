import Settings from "./library_settings.js";
import Scores from "./library_scores.js";
import Cards from "./library_cards.js";
import Card from "./library_card.js";

$(document).ready(() => {
    // adding jQuery ui class for styling text box
    $("#player_name").addClass("ui-widget ui-state-default ui-corner-all");
    // adding tab view using jQuery UI
    $("#tabs").tabs();
    // adding button using jQuery UI
    $("#new_game a").button();
    $("#save_settings").button();
    $("#num_cards").selectmenu();

    // click event for storing session
    $("#save_settings").click(() => {
        let playerName = $("#player_name").val().trim();
        let cards = $("#num_cards").val().trim();
        $("#player_name").val(playerName);
        if (playerName == "") {
            $("#error").text("Please Enter Player Name");
        } else if (!isNaN(playerName)) {
            $("#error").text("Please Enter a valid Player Name");
        } else {
            $("#error").text("*");

            // Storing values in session
            Settings.setPlayerName("player", playerName);
            Settings.setNumCards("cards", cards);

            location.reload();
        }
    });

    // creating images and cards array and inserting values
    const images = [Cards.getCardBackSrc(), Cards.getBlankCardSrc()];
    const cards = [];
    for (let i = 1; i <= Cards.getNumberOfImages(); i++) {
        Cards.preloadImages(images, i);
    }
    for (let i = 1; i <= Cards.getNumberOfImages(); i++) {
        Cards.preloadImages(cards, i);
        Cards.preloadImages(cards, i);
    }

    // setting session value
    if ("player" in sessionStorage) {
        const playerValue = Settings.getPlayerName("player");
        const playerCards = Settings.getNumCards("cards");
        $("#player").text(`Player: ${playerValue}`);

        let rowCount = 0;
        // Slicing array according to number of cards
        let slicedArray = cards.slice(0, playerCards);
        // Shuffling array
        const shuffledArray = slicedArray.sort((a, b) => 0.5 - Math.random());
        let flippedImage = [];
        let checkCard = [];
        // Looping through the no. of rows with new element
        for (let i = 1; i <= playerCards; i += 8) {
            $("#cards").append(`<div class="card-row-${++rowCount}"></div>`);
            // Looping through the no. of cards in a row
            for (let j = i; j < i + 8; j++) {
                $(`.card-row-${rowCount}`).append(Cards.createCardHTML(j));
                // click event for flipping card
                $(`#card${j}`).on("click", function () {
                    const card = new Card(`#card${j}`);

                    let src = $(this).attr("src");
                    let newSrc;

                    // Changing image src on click
                    if (src.includes(Cards.getCardBackSrc())) {
                        newSrc = shuffledArray[j - 1];
                        if (!checkCard.includes(j)) {
                            flippedImage.push(newSrc);
                            checkCard.push(j);
                        }
                    } else if (card.isBlankOrRevealed()) {
                        newSrc = Cards.getBlankCardSrc();
                    } else {
                        newSrc = Cards.getCardBackSrc();
                        // removing last element if same card is clicked again
                        flippedImage.pop();
                        checkCard.pop();
                    }
                    // Calling Fading function in Cards Object
                    Cards.flipCardFade(this, newSrc);

                    // validating cards
                    if (flippedImage.length == 2 && checkCard.length == 2) {
                        // disabling click event
                        $("#cards a").css({ "pointer-events": "none" });
                        if (
                            card.isSameCard(flippedImage[0], flippedImage[1]) &&
                            !card.isSameCard(checkCard[0], checkCard[1])
                        ) {
                            setTimeout(function () {
                                // Calling Sliding function in Cards Object
                                Cards.flipCardSlide(`.card-img[src='${flippedImage[1]}']`);
                                flippedImage.length = 0;
                                checkCard.length = 0;
                                // enabling click event
                                $("#cards a").css({ "pointer-events": "" });
                            }, 1000);
                            // Increment Correct Attempts Count
                            Scores.incrementCorrectAttempts();
                        } else if (
                            card.isSameCard(flippedImage[0], flippedImage[1]) &&
                            card.isSameCard(checkCard[0], checkCard[1])
                        ) {
                            flippedImage.length = 0;
                            checkCard.length = 0;
                            $("#cards a").css({ "pointer-events": "" });
                        } else {
                            setTimeout(function () {
                                Cards.flipCardFade(`.card-img[src='${flippedImage[0]}']`);
                                Cards.flipCardFade(`.card-img[src='${flippedImage[1]}']`);
                                checkCard.length = 0;
                                flippedImage.length = 0;
                                // enabling click event
                                $("#cards a").css({ "pointer-events": "" });
                            }, 2000);
                        }
                        if (!card.isSameCard(checkCard[0], checkCard[1])) {
                            // Increment total Attempts Count
                            Scores.incrementAttempts();
                        }
                    }
                    if (Scores.checkAllcardsRemoved()) {
                        Scores.comparingScores();
                    }
                });
            }
        }
    }
});

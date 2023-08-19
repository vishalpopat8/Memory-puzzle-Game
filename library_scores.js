import Settings from "./library_settings.js";
const Scores = (function () {
    let noOfAttempts = 0;
    let correctAttempts = 0;

    const incrementAttempts = function () {
        noOfAttempts++;
    };

    const incrementCorrectAttempts = function () {
        correctAttempts++;
    };

    const getCurrentNoOfAttempts = function () {
        return noOfAttempts;
    };

    const getCurrentCorrectAttempts = function () {
        return correctAttempts;
    };

    // Method for setting local storage
    const setLocalStorage = function (name, value) {
        return localStorage.setItem(name, value);
    };

    // Method for setting local storage
    const getLocalStorage = function (name) {
        return localStorage.getItem(name);
    };

    // Method for setting local storage
    const checkAllcardsRemoved = function () {
        const playerCards = Settings.getNumCards("cards");
        return correctAttempts === playerCards / 2;
    };

    // Method for comparing and displaying scores
    const comparingScores = function () {
        let score = (correctAttempts / noOfAttempts) * 100;
        setLocalStorage("correct", score);
        let correctValue = getLocalStorage("correct");
        let high_scoreValue = getLocalStorage("high_score") || 0;
        if (correctValue > high_scoreValue) {
            setLocalStorage("high_score", score);
            high_scoreValue = getLocalStorage("high_score") || 0;
        }
        setTimeout(function () {
            $("#high_score").text(`High Score: ${parseInt(high_scoreValue)}%`);
            $("#correct").text(`Correct: ${parseInt(correctValue)}%`);
        }, 1500);
    };

    return {
        correctAttempts: getCurrentCorrectAttempts,
        noOfAttempts: getCurrentNoOfAttempts,
        incrementAttempts: incrementAttempts,
        incrementCorrectAttempts: incrementCorrectAttempts,
        getLocalStorage: getLocalStorage,
        setLocalStorage: setLocalStorage,
        checkAllcardsRemoved: checkAllcardsRemoved,
        comparingScores: comparingScores,
    };
})();

// Export the Scores object
export default Scores;

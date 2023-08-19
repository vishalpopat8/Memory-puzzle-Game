// Settings Object with different methods for getting
// and setting player name and no. of cards
const Settings = {
    getPlayerName: function (getPlayer) {
        return sessionStorage.getItem(getPlayer);
    },
    setPlayerName: function (setName, playerName) {
        return sessionStorage.setItem(setName, playerName);
    },
    getNumCards: function (getCards) {
        return parseInt(sessionStorage.getItem(getCards));
    },
    setNumCards: function (setCards, numCards) {
        return sessionStorage.setItem(setCards, numCards);
    },
};

// Export the Settings object
export default Settings;

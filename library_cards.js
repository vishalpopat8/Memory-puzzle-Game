const Cards = (function () {
    // Private variables for card attributes
    const cardBackSrc = "images/back.png";
    const blankCardSrc = "images/blank.png";
    let numberOfImages = 24;

    // Private functions for preloading images and creating card HTML
    const preloadImages = function (imagesArray, i) {
        imagesArray.push(`images/card_${i}.png`);
    };

    const createCardHTML = function (cardId) {
        return `<a href="#"><img class="card-img" id="card${cardId}" src="${cardBackSrc}" alt="card_image_${cardId}"></a>`;
    };

    const flipCardFade = function (cardElement, newSrc = cardBackSrc) {
        $(cardElement).fadeOut(500, function () {
            $(this).attr("src", newSrc).fadeIn(500);
        });
    };

    const flipCardSlide = function (cardElement) {
        $(cardElement).animate(
            {
                height: "0",
                opacity: "0",
            },
            500,
            function () {
                $(cardElement).attr("src", blankCardSrc);
            }
        );
    };

    // Read-only properties to access private variables
    const getCardBackSrc = function () {
        return cardBackSrc;
    };

    const getBlankCardSrc = function () {
        return blankCardSrc;
    };

    const getNumberOfImages = function () {
        return numberOfImages;
    };

    // Return public methods and read-only properties
    return {
        preloadImages: preloadImages,
        createCardHTML: createCardHTML,
        flipCardFade: flipCardFade,
        flipCardSlide: flipCardSlide,
        getCardBackSrc: getCardBackSrc,
        getBlankCardSrc: getBlankCardSrc,
        getNumberOfImages: getNumberOfImages,
    };
})();

export default Cards;

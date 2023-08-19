import Cards from "./library_cards.js";
// Card class checking blank and same cards
class Card {
    constructor(Tag) {
        this.img = $(Tag);
        this.id = this.img.attr("id");
    }

    isBlankOrRevealed() {
        const src = this.img.attr("src");
        return src.includes(Cards.getBlankCardSrc());
    }

    isSameCard(firstCard, secondCard) {
        return firstCard === secondCard;
    }
}

export default Card;

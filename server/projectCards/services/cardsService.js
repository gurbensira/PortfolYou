import { validateCard } from "../validation/cardValidationService.js";
import { createCard } from "./cardsDataService.js";

export const createNewCard = async (card, userId, uploadedFile) => {
    try {
        card.user_id = userId;

        if (uploadedFile) {
            card.image = {
                url: uploadedFile.path,
                alt: card.image?.alt || card.title || '',
            };
        }

        const { error } = validateCard(card);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const newCard = await createCard(card);
        return newCard;
    } catch (error) {
        throw new Error(error.message);
    }
};
import {instance} from "./Instance/instance";
import {CardsType, newCardType, RequestCardType} from "../types/CardsTypes";

export const cardsApi = {
    getCards(cardsPack_id: string, pageCount: number) {
        return instance.get<RequestCardType>(`/cards/card?`, {params: {cardsPack_id, pageCount}})
    },
    addCards(card: newCardType) {
        return instance.post<CardsType>(`/cards/card`, {card})
    },
    deleteCards(cardsPack_id: string) {
        return instance.delete(`/cards/card?id=${cardsPack_id}`)
    },
    changeCards(card: newCardType) {
        return instance.put(`/cards/card`, {card})
    },
    changeGrade(grade: number, card_id: string) {
        return instance.put<CardsType>(`/cards/grade`, {grade, card_id})
    },
}



import {instance} from "./Instance/instance";


export const cardsApi = {
    getCards(cardsPack_id: string, pageCount:number) {
        return instance.get<RequestCardType>(`/cards/card?`, {params: {cardsPack_id,pageCount}})
    },
    addCards (card: newCardType) {
        return instance.post<CardsType>(`/cards/card`,{card})
    },
    deleteCards(cardsPack_id:string) {
        return instance.delete(`/cards/card?id=${cardsPack_id}`)
    },
    changeCards(card: newCardType) {
        return instance.put(`/cards/card`, {card})
    },
    changeGrade(grade:number, card_id:string) {
        return instance.put<CardsType>(`/cards/grade`, { grade, card_id })
    }
}

//types
export type RequestCardType = {
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
    card_id: string

}
export type newCardType = {
    _id?: string
    question?: string
    answer?: string
}



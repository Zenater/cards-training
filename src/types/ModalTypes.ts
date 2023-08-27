export type ButtonsForModalType = "justButton" | "delButton" | "changeNamePack" | "startLearn" | 'newCard'

export type ModalAddPackPropsType = {
    changeCards: () => void
    cancelHandler: () => void
}
export type ModalChangeCardsPropsType = {
    _id?: string
    question: string
    answer: string
}
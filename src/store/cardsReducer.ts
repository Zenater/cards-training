import {AppThunk} from "./store";
import {setAppStatusAC} from "./appReducer";
import {handleServerAppError} from "../utils/error-utils";
import {cardsApi, RequestCardType} from "../api/cardsApi";
import {setPackUserIdAC} from "./packsReducer";

const initialState = {} as RequestCardType;

export type CardsReducerType = typeof initialState

export const cardsReducer = (state = initialState, action: CardsActionType): CardsReducerType => {
    switch (action.type) {
        case "CARDS/GET-CARDS":
            return {...state, ...action.cards}
        case "CARDS/CHANGE-GRADE":{
            return {...state, cards: state.cards.map(card=> card._id === action.card_id ? {...card, grade:action.grade} : card)}}
        case "CARDS/CHANGE-CURRENT-PAGE":
            return {...state, page: action.currentPage}
        case "CARDS/CHANGE-COUNT-ROWS":
            return {...state, pageCount: action.countOfRows}
        default:
            return state
    }
};

export const getCardsDataAC = (cards: RequestCardType) => ({type: "CARDS/GET-CARDS", cards} as const);

export type CardsActionType = ReturnType<typeof getCardsDataAC> | ReturnType<typeof changeGradeAC> |
ReturnType<typeof changeCurrentPageCardsAC> | ReturnType<typeof changeCountOfRawsCardsAC>

export const changeGradeAC = (grade:number, card_id:string) => ({type: "CARDS/CHANGE-GRADE", grade, card_id} as const);
export const changeCurrentPageCardsAC = (currentPage: number) => ({type: "CARDS/CHANGE-CURRENT-PAGE",currentPage} as const);
export const changeCountOfRawsCardsAC = (countOfRows: number) => ({type: "CARDS/CHANGE-COUNT-ROWS", countOfRows} as const);

export const getCardsTC = (cardsPack_id: string,): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setAppStatusAC('loading'))
        let pageCount = getState().card.pageCount

        let res = await cardsApi.getCards(cardsPack_id, pageCount )
        dispatch(setPackUserIdAC(res.data.packUserId))
        dispatch(getCardsDataAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e:any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const addNewCardsTC = (cardsPack_id: string, question?: string, answer?: string): AppThunk => async (dispatch, ) => {

    const newCard = {cardsPack_id, question, answer}

    try {
        dispatch(setAppStatusAC('loading'))
        await cardsApi.addCards(newCard)
        dispatch(getCardsTC(cardsPack_id))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const updateCardsTC = (_id: string, question?: string, answer?: string, cardsPack_id?: string): AppThunk => async (dispatch, ) => {

    const newCard = {_id, question, answer}

    try {
        dispatch(setAppStatusAC('loading'))
        await cardsApi.changeCards(newCard)
        if(cardsPack_id) {
            dispatch(getCardsTC(cardsPack_id))
        }
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const deleteCardsTC = (packId: string, cardsPack_id: string): AppThunk => async (dispatch, ) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await cardsApi.deleteCards(cardsPack_id)
        dispatch(getCardsTC(packId))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const changeGradeTC = (grade:number, card_id:string): AppThunk => async (dispatch, ) => {

    try {
        dispatch(setAppStatusAC('loading'))
        let res = await cardsApi.changeGrade(grade, card_id)
        dispatch(changeGradeAC(res.data.grade, res.data.card_id ))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}


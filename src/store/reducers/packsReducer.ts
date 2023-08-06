import {AppThunk} from "../store";
import {setAppStatus} from "./appReducer";
import {handleServerAppError} from "../../utils/error-utils";
import {PacksApi} from "../../api/packsApi";
import {AnswerGetPackType, OnePackType, sortPacksUpdateType} from "../../types/PacksTypes";

const initialState = {
    cardPacks: [] as OnePackType[],
    cardPacksTotalCount: 0,
    filterForPacks: {
        minCardsCount: 0,
        maxCardsCount: 100,
        pageCount: 8,
        page: 1,
        sortPacksUpdate: "0updated",
        packName: '' as string,
        user_id: '' as string,
        packUserId: '' as string,
        private: false,
        deckCover: ""
    },
} as AnswerGetPackType

export type PackReducerType = typeof initialState

export const packReducer = (state = initialState, action: PacksActionType): PackReducerType => {
    switch (action.type) {
        case "PACK/GET-PACKS":
            return {...state, ...action.packs}
        case "PACK/CHANGE-COUNT-ROWS":
            return {...state, filterForPacks: {...state.filterForPacks, pageCount: action.countOfRows}}
        case "PACK/SET-MIN-MAX-ROWS":
            return {
                ...state, filterForPacks: {
                    ...state.filterForPacks,
                    minCardsCount: action.minMaxValue[0],
                    maxCardsCount: action.minMaxValue[1]
                }
            }
        case "PACK/CHANGE-CURRENT-PAGE":
            return {...state, filterForPacks: {...state.filterForPacks, page: action.currentPage}}
        case "PACK/SET-SEARCH-PACKS-NAME":
            return {
                ...state, filterForPacks: {
                    ...state.filterForPacks, packName: action.packName
                }
            }
        case "PACK/SHOW-MY-PACKS":
            return {
                ...state, filterForPacks: {
                    ...state.filterForPacks, user_id: action.user_id
                }
            }
        case "PACK/SORT-PACKS":
            return {...state, filterForPacks: {...state.filterForPacks, sortPacksUpdate: action.sort}}
        case "PACK/SET-PACK-USER-ID":
            return {
                ...state, filterForPacks: {
                    ...state.filterForPacks, packUserId: action.packUserId
                }
            }
        case "PACK/PRIVATE-PACKS":
            return {
                ...state, filterForPacks:
                    {...state.filterForPacks, private: action.privatePacks}
            }
        default:
            return state
    }
};
//AC
export const setSearchNamePacks = (packName: string) => ({type: "PACK/SET-SEARCH-PACKS-NAME", packName} as const)
export const getPacksData = (packs: AnswerGetPackType) => ({type: "PACK/GET-PACKS", packs} as const);
export const setPrivatePacks = (privatePacks: boolean) => ({type: "PACK/PRIVATE-PACKS", privatePacks} as const);
export const changeCountOfRaws = (countOfRows: number) => ({type: "PACK/CHANGE-COUNT-ROWS", countOfRows} as const);
export const changeCurrentPage = (currentPage: number) => ({type: "PACK/CHANGE-CURRENT-PAGE", currentPage} as const);
export const showPyPacks = (user_id: string | null) => ({type: "PACK/SHOW-MY-PACKS", user_id} as const);
export const sortPacks = (sort: sortPacksUpdateType) => ({type: "PACK/SORT-PACKS", sort} as const);
export const setPackUserId = (packUserId: string) => ({type: 'PACK/SET-PACK-USER-ID', packUserId} as const)
export const setMinMaxAmountOfCards = (minMaxValue: number[]) => ({
    type: "PACK/SET-MIN-MAX-ROWS",
    minMaxValue
} as const);

//types for AC
export type PacksActionType =
    ReturnType<typeof getPacksData>
    | ReturnType<typeof changeCountOfRaws>
    | ReturnType<typeof setMinMaxAmountOfCards>
    | ReturnType<typeof changeCurrentPage>
    | ReturnType<typeof setSearchNamePacks>
    | ReturnType<typeof showPyPacks>
    | ReturnType<typeof changeCountOfRaws>
    | ReturnType<typeof setMinMaxAmountOfCards>
    | ReturnType<typeof changeCurrentPage>
    | ReturnType<typeof sortPacks>
    | ReturnType<typeof setPackUserId>
    | ReturnType<typeof setPrivatePacks>

//thunks
export const getPacksTC = (): AppThunk => async (dispatch, getState) => {
    try {
        let model = getState().packs.filterForPacks
        dispatch(setAppStatus('loading'))
        let res = await PacksApi.getPack(model)
        dispatch(getPacksData(res.data))
        dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
};

export const deletePackTC = (idPack: string): AppThunk => async (dispatch,) => {
    try {
        dispatch(setAppStatus('loading'))
        await PacksApi.delPack(idPack)
        dispatch(getPacksTC())
        dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}

export const changePackTC = (name: string, file: string, idPack: string): AppThunk => async (dispatch,) => {
    try {
        dispatch(setAppStatus('loading'))
        await PacksApi.changePack(name, file, idPack,)
        dispatch(getPacksTC())
        dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}

export const addNewPackTC = (newName: string, file: string, privatePacks: boolean): AppThunk => async (dispatch,) => {
    try {
        dispatch(setAppStatus('loading'))
        await PacksApi.addNewPack(newName, file, privatePacks)
        dispatch(getPacksTC())
        dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}
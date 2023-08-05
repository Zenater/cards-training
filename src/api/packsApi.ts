import {instance} from "./Instance/instance";
import {AnswerGetPackType, FilterForPacksType} from "../types/PacksTypes";

export const PacksApi = {
    getPack(value: FilterForPacksType) {
        return instance.get<AnswerGetPackType>(`cards/pack`, {
            params: {
                min: value.minCardsCount,
                max: value.maxCardsCount,
                pageCount: value.pageCount,
                page: value.page,
                sortPacks: value.sortPacksUpdate,
                packName: value.packName,
                user_id: value.user_id === null ? '' : value.user_id
            }
        })
    },
    addNewPack(newName: string, file: string, privatePacks: boolean,) {
        const cardsPack = {name: newName, deckCover: file, private: privatePacks,}
        return instance.post(`cards/pack`, {cardsPack})
    }
    ,
    delPack(idPack: string) {
        return instance.delete(`/cards/pack?id=${idPack}`)
    },
    changePack(name: string, file: string, idPack: string,) {
        const cardsPack = {name: name, deckCover: file, _id: idPack}
        return instance.put(`/cards/pack?id=${idPack}`, {cardsPack})
    }
}

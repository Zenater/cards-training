import {instance} from "./cardsApi";


export const PacksApi = {
    getPack(value:FilterForPacksType) {
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
    addNewPack(newName:string,file:string, privatePacks:boolean, ) {
        const cardsPack = {name: newName,deckCover:file,private:privatePacks, }
        return instance.post(`cards/pack`, {cardsPack})}
    ,
    delPack(idPack:string) {
        return instance.delete(`/cards/pack?id=${idPack}`)
    },
    changePack( name:string,file:string,idPack:string,) {
        const cardsPack = { name:name,deckCover:file,_id:idPack}
        return instance.put(`/cards/pack?id=${idPack}`,{cardsPack})
    }

}

export type AnswerGetPackType = {
    cardPacks: OnePackType[]
    cardPacksTotalCount: number
    filterForPacks: FilterForPacksType
};

export type OnePackType = {
    _id: string
    user_id: string
    user_name:string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    updated: string
    __v: number
    deckCover:string
}

export type FilterForPacksType = {
    minCardsCount?: number
    maxCardsCount?: number
    pageCount?: number
    page: number
    sortPacksUpdate?:sortPacksUpdateType
    packName?:string
    user_id?: string | null
    packUserId?: string | null
    private?:boolean

}

export type sortPacksUpdateType = "0updated" | "1updated" | "0name" | "1name" | "0cardsCount" | "1cardsCount"
import axios from "axios";


// export const instance = axios.create({
//     baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
//     withCredentials: true,
// })
export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || ' https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})


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
    addNewPack(newName:string, privatePacks:boolean, file:string) {
        const cardsPack = {name: newName,private:privatePacks, deckCover:file}
        return instance.post(`cards/pack`, {cardsPack})}
    ,
    delPack(idPack:string) {
        return instance.delete(`/cards/pack?id=${idPack}`)
    },
    changePack(idPack:string, name:string,file:string) {
        const cardsPack = {_id:idPack, name:name,deckCover:file}
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
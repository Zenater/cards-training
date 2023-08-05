
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

export type sortPacksUpdateType = "0updated" | "1updated" | "0name" | "1name"
    | "0cardsCount" | "1cardsCount"
export type ProfileType = {
  _id: string
  email: string | null
  name: string | null
  avatar: string | null
  publicCardPacksCount: number | null
  created: string | null
  updated: string | null
  isAdmin: boolean | null
  verified: boolean | null
  rememberMe: boolean | null
  error?: string | null
}
export type LoginParamsType = {
  email: string
  password: string
  rememberMe?: boolean
}

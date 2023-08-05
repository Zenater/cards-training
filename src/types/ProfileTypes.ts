import {ProfileType} from "./AuthTypes";

export type AnswerChangeProfileType = {
  updatedUser: ProfileType
  error?: string
}
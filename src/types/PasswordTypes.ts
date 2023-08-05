export type SendMailType = {
  email: string
  from: string
  message: string
}

export type RequestType = {
  info: string
  error: string;
}
export type NewPasswordType = {
  password?: string
  resetPasswordToken?: string | undefined
}
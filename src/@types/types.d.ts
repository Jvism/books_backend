import type { User } from '@prisma/client'

export interface IUserCreate {
  username: string
  email: string
  password: string
  name?: string
  lastname?: string
}

export interface IUserUpdateInfo {
  email?: string
  username?: string
  name?: string
  lastname?: string
}

export interface IUserUpdatePassword extends User {
  password: string
}

export interface IUserSimpleResponse {
  id: number
  name: string
  lastname: string
  username: string
  email: string
}

// JWT

export interface tokenData extends IUserSimpleResponse {
  exp: number
}

// AUTH

export interface loginData extends User {
  email: string
  password: string
}
import type { User } from '@prisma/client'
import type { BookStatus } from '@prisma/client'

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

export interface IUserResponse {
  id: number
  username: string
  email: string
  name: string | null
  lastname: string | null
  instagram: string | null
  linkedin: string | null
  createdAt: Date
  updatedAt: Date | null
}

// BOOKS

export interface IBookResponse {
  id: number
  title: string
  status: BookStatus
  publishDate: Date
  shortDescription: string | null
  longDescription: string | null
  thumbnailUrl: string | null
  pages: number | null
  createdAt: Date
  updatedAt: Date | null
}

// AUTHORS

export interface IAuthorResponse {
  id: number
  name: string
  lastName: string
  createdAt: Date
  updatedAt: Date | null
}

export interface ICategoryResponse {
  id: number
  name: string
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
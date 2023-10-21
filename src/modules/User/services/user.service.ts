import prisma from '@/db/connection'
import type { IUserCreate, IUserUpdateInfo } from '@/@types/types.d'
import type { User } from '@prisma/client'

export const findUserById = async (id: number): Promise<User | null> => {
  const userFound = await prisma.user.findUnique({
    where: {
      id
    }
  })

  return userFound
}

export const getAllUsers = async (): Promise<User[] | null> => {
  const usersFound = await prisma.user.findMany()

  return usersFound
}

export const createUser = async (userData: IUserCreate): Promise<User | null> => {
  const userCreated = await prisma.user.create({
    data: userData
  })

  return userCreated
}

export const updateUser = async (userId: number, userData: IUserUpdateInfo): Promise<User | null> => {
  const userUpdated = await prisma.user.update({
    where: {
      id: userId
    },
    data: userData
  })

  return userUpdated
}

export const deleteUser = async (userId: number): Promise<User | null> => {
  const userDeleted = await prisma.user.delete({
    where: {
      id: userId
    }
  })

  return userDeleted
}

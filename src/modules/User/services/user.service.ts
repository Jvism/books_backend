import prisma from '@/db/connection'
import type { IUserCreate, IUserUpdateInfo, IUserResponse } from '@/@types/types.d'

export const findUserById = async (id: number): Promise<IUserResponse | null> => {
  const userFound = await prisma.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      lastname: true,
      instagram: true,
      linkedin: true,
      createdAt: true,
      updatedAt: true,
      categories: true
    }
  })

  return userFound
}

export const findUserByUsername = async (username: string): Promise<IUserResponse | null> => {
  const userFound = await prisma.user.findUnique({
    where: {
      username
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      lastname: true,
      instagram: true,
      linkedin: true,
      createdAt: true,
      updatedAt: true,
      categories: true
    }
  })

  return userFound
}

export const getAllUsers = async (): Promise<IUserResponse[] | null> => {
  const usersFound = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      lastname: true,
      instagram: true,
      linkedin: true,
      createdAt: true,
      updatedAt: true
    }
  })

  return usersFound
}

export const createUser = async (userData: IUserCreate): Promise<IUserResponse | null> => {
  const userCreated = await prisma.user.create({
    data: userData,
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      lastname: true,
      instagram: true,
      linkedin: true,
      createdAt: true,
      updatedAt: true
    }
  })

  return userCreated
}

export const updateUser = async (userId: number, userData: IUserUpdateInfo): Promise<IUserResponse | null> => {
  const userUpdated = await prisma.user.update({
    where: {
      id: userId
    },
    data: userData,
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      lastname: true,
      instagram: true,
      linkedin: true,
      createdAt: true,
      updatedAt: true
    }
  })

  return userUpdated
}

export const deleteUser = async (userId: number): Promise<IUserResponse | null> => {
  const userDeleted = await prisma.user.delete({
    where: {
      id: userId
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      lastname: true,
      instagram: true,
      linkedin: true,
      createdAt: true,
      updatedAt: true
    }
  })

  return userDeleted
}

import type { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { createUser, getAllUsers, findUserById, updateUser, deleteUser } from '../services/user.service'
import type { IUserCreate, IUserSimpleResponse, IUserUpdateInfo } from '@/@types/types.d'
import type { User } from '@prisma/client'

export const getUsersController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const usersFound: User[] | null = await getAllUsers()
    if (!usersFound) {
      res.status(404).json({ message: 'Users not found' })
    } else {
      res.json(usersFound)
    }
  } catch (error) {
    next(error)
  }
}

export const getUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params || null

    if (!id) {
      res.status(400).json({ message: 'Missing id' })
    }

    const userFound: User | null = await findUserById(Number(id))
    if (!userFound) {
      res.status(404).json({ message: 'User not found' })
    } else {
      res.json(userFound)
    }
  } catch (error) {
    next(error)
  }
}

export const createUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData: IUserCreate = req.body
    if (!userData) {
      res.status(400).json({ message: 'Missing data' })
    }

    userData.password = await bcrypt.hash(userData.password, 10)
    const userCreated: User | null = await createUser(userData)

    if (!userCreated) {
      res.status(400).json({ message: 'User not created' })
    } else {
      const userResponse: IUserSimpleResponse = {
        id: userCreated.id,
        name: userCreated.name || '',
        lastname: userCreated.lastname || '',
        username: userCreated.username,
        email: userCreated.email
      }
      console.log(userCreated)
      res.json(userResponse)
    }
  } catch (error) {
    next(error)
  }
}

export const updateUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params || null
    const userData: IUserUpdateInfo = req.body

    if (!id) {
      res.status(400).json({ message: 'Missing id' })
    }
    if (!userData) {
      res.status(400).json({ message: 'Missing data' })
    }

    const userUpdated: User | null = await updateUser(Number(id), userData)
    if (!userUpdated) {
      res.status(400).json({ message: 'User not updated' })
    } else {
      res.json(userUpdated)
    }
  } catch (error) {
    next(error)
  }
}

export const deleteUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params || null
    if (!id) {
      res.status(400).json({ message: 'Missing id' })
    }

    const userDeleted: User | null = await deleteUser(Number(id))
    if (!userDeleted) {
      res.status(400).json({ message: 'User not deleted' })
    } else {
      res.json(userDeleted)
    }
  } catch (error) {
    next(error)
  }
}

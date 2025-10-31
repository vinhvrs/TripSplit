import { StatusCodes } from 'http-status-codes'
import { userService } from '../services/user.service'

export const userController = {
  async register(req, res, next) {
    try {
      const newUser = await userService.register(req.body)
      res.status(StatusCodes.CREATED).json(newUser)
    } catch (error) {
      next(error)
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await userService.login(email, password)
      res.status(StatusCodes.OK).json(user)
    }
    catch (error) {
      next(error)
    }
  },

  async getUserById(req, res, next) {
    try {
      const userId = req.params.id
      const user = await userService.getUserById(userId)
      res.status(StatusCodes.OK).json(user)
    } catch (error) {
      next(error)
    }
  },

  async getUserByEmail(req, res, next) {
    try {
      const email = req.params.email
      const user = await userService.getUserByEmail(email)
      res.status(StatusCodes.OK).json(user)
    } catch (error) {
      next(error)
    }
  },

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers()
      res.status(StatusCodes.OK).json(users)
    } catch (error) {
      next(error)
    }
  },

  async updateUser(req, res, next) {
    try {
      const userId = req.params.id
      const updateData = req.body
      const updatedUser = await userService.updateUser(userId, updateData)
      res.status(StatusCodes.OK).json(updatedUser)
    } catch (error) {
      next(error)
    }
  }
}


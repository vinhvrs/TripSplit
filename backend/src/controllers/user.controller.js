import { StatusCodes } from 'http-status-codes'
import { userService } from '../services/user.service'
import jwt from 'jsonwebtoken'

export const userController = {
  async register(req, res, next) {
    try {
      const newUser = await userService.register(req.body)

      // Generate JWT token
      const token = jwt.sign(
        { id: newUser._id, name: newUser.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      )

      // Return user data with token (excluding password)
      res.status(StatusCodes.CREATED).json({
        token,
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt
      })
    } catch (error) {
      next(error)
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await userService.login(email, password)

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      )

      // Return user data with token (excluding password)
      res.status(StatusCodes.OK).json({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      })
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
  },

  async getCurrentUser(req, res, next) {
    try {
      // req.user is set by verifyToken middleware
      const userId = req.user.id
      const user = await userService.getUserById(userId)

      // Return user data without password
      res.status(StatusCodes.OK).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      })
    } catch (error) {
      next(error)
    }
  }
}


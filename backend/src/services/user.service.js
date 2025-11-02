import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import UserModel from '~/models/user.model'
import bcrypt from 'bcryptjs'

export const userService = {
  async register(userData) {
    const existingUser = await UserModel.findOne({ email: userData.email })
    if (existingUser) {
      throw new ApiError(StatusCodes.CONFLICT, 'Email already in use')
    }
    const newUser = new UserModel(userData)
    newUser.password = await bcrypt.hash(userData.password, 10)
    await newUser.save()
    return newUser
  },

  async login(email, password) {
    const user = await UserModel.findOne({ email: email })
    if (!user) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password')
    }
    return user
  },

  async googleLogin(accessToken, refreshToken, profile, done) {
    try {
      const email = profile.emails[0].value
      let user = await UserModel.findOne({ email: email })
      if (!user) {
        user = new UserModel({
          email: email,
          name: profile.displayName
        })
        await user.save()
      }
      return done(null, user)
    }
    catch (err) {
      return done(err, null)
    }
  },

  async findOrCreateFacebookUser(email, profile) {
    let user = await UserModel.findOne({ email })
    if (!user) {
      user = new UserModel({
        email,
        name: profile.displayName,
        avatar: profile.photos?.[0]?.value || ''
      })
      await user.save()
    }
    return user
  },

  async findOrCreateGoogleUser(email, profile) {
    let user = await UserModel.findOne({ email: email })
    if (!user) {
      user = new UserModel({
        email: email,
        name: profile.displayName,
        password: bcrypt.hashSync(Math.random().toString(36).slice(-8), 10)
      })
      await user.save()
    }
    return user
  },

  async getUserById(userId) {
    const user = await UserModel.findById(userId).select('-password')
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    }
    return user
  },

  async getUserByEmail(email) {
    const user = await UserModel.findOne({ email: email }).select('-password')
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    }
    return user
  },

  async getAllUsers() {
    return await UserModel.find().select('-password')
  },

  async updateUser(userId, updateData) {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select('-password')
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    }
    return user
  }

}
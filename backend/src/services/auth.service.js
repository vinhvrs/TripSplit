import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import UserModel from '~/models/user.model'

const authService = {
  async googleLogin(email, user) {
    try {
      let existingUser = await UserModel.findOne({ email: email })
      console.log('Google login attempt for email:', email)
      if (!existingUser) {
        user = new UserModel({
          email: email,
          name: user.name
        })
        await user.save()
      }
      return user
    } catch (err) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error logging in with Google')
    }
  },

  async facebookLogin(email, user) {
    try {
      let existingUser = await UserModel.findOne({ email: email })
      console.log('Facebook login attempt for email:', email)
      if (!existingUser) {
        user = new UserModel({
          email: email,
          name: user.name,
          avatar: user.avatar || ''
        })
        await user.save()
      }
      return user
    } catch (err) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error logging in with Facebook')
    }
  }

}

export default authService

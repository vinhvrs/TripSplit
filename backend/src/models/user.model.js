import mongoose from 'mongoose'

const schemaOptions = {
  timestamps: true,
  collection: 'users',
  toJSON: {
    virtuals: true
  }
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, schemaOptions)

const UserModel = mongoose.model('UserModel', UserSchema)

export default UserModel

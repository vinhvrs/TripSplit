import mongoose from 'mongoose'

const schemaOptions = {
  timestamps: true,
  collection: 'groups',
  toJSON: {
    virtuals: true
  }
}

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true
  },
  user_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true
  }],
  expenses_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExpenseModel',
    required: false
  }],
  url_invite: {
    type: String,
    required: false,
    unique: true
  }
}, schemaOptions)

const GroupModel = mongoose.model('GroupModel', GroupSchema)

export default GroupModel

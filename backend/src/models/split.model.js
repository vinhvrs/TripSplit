import mongoose from 'mongoose'

const schemaOptions = {
  timestamps: true,
  collection: 'splits',
  toJSON: {
    virtuals: true
  }
}

const SplitSchema = new mongoose.Schema({
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupModel',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true
  },
  pay_to: [{
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel',
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  get_pay_by: [{
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel',
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    }
  }]
}, schemaOptions)

const SplitModel = mongoose.model('SplitModel', SplitSchema)

export default SplitModel

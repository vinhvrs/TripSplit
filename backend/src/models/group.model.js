import mongoose from 'mongoose';

const schemaOptions = { 
  timestamps: true,
  collection: 'groups',
  toJSON: {
    virtuals: true,
  }
}

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  user_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  }],
  expenses_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExpenseModel',
    required: false,
  }]
}, schemaOptions);

const GroupModel = mongoose.model('GroupModel', GroupSchema);

export default GroupModel;

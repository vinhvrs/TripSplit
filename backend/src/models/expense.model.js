import mongoose from 'mongoose';

const schemaOptions = {
  timestamps: true,
  collection: 'expenses',
  toJSON: {
    virtuals: true,
  }
}

const ExpenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paid_by: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  }],
  images: [{
    type: String,
    required: false,
  }]
}, schemaOptions);

const ExpenseModel = mongoose.model('ExpenseModel', ExpenseSchema);

export default ExpenseModel;

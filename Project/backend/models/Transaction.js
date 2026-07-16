const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'Description is required.'],
      trim: true,
      maxlength: [100, 'Description must not exceed 100 characters.'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required.'],
      min: [0.01, 'Amount must be greater than zero.'],
    },
    type: {
      type: String,
      required: true,
      enum: ['income', 'expense'],
    },
    category: {
      type: String,
      required: [true, 'Category is required.'],
      trim: true,
      maxlength: [50, 'Category must not exceed 50 characters.'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required.'],
    },
    note: {
      type: String,
      trim: true,
      maxlength: [250, 'Note must not exceed 250 characters.'],
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);


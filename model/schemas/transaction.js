const { Schema, SchemaTypes, model } = require('mongoose');
const Joi = require('joi');

const transactionSchema = Schema(
  {
    date: {
      type: Date,
      default: new Date(),
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    isIncome: {
      type: Boolean,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

const joiTransactionSchema = Joi.object({
  date: Joi.date().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  amount: Joi.number().required(),
  isIncome: Joi.boolean(),
});

const Transaction = model('transaction', transactionSchema);

module.exports = { Transaction, joiTransactionSchema };

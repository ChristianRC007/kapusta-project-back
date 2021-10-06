const { Schema, SchemaTypes, model } = require('mongoose');
const Joi = require('joi');

// const CategoriesExpenses = [
//   'Транспорт',
//   'Продукты',
//   'Здоровье',
//   'Алкоголь',
//   'Развлечения',
//   'Всё для дома',
//   'Техника',
//   'Коммуналка, связь',
//   'Спорт, хобби',
//   'Образование',
//   'Прочее',
// ];
// const categoriesIncome = ['ЗП', 'Доп. доход'];

const transactionSchema = Schema(
  {
    date: {
      type: Date,
      default: new Date(),
    },
    category: {
      type: String,
      // enum: [...CategoriesExpenses, ...categoriesIncome],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      // default: 0,
      required: true,
    },
    isIncome: {
      type: Boolean,
      // default: true,
      // required: true,
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
//   category: Joi.string().required().valid(...CategoriesExpenses, ...categoriesIncome),
//   amount: Joi.number().min(0.01).required(),

const Transaction = model('transaction', transactionSchema);

module.exports = { Transaction, joiTransactionSchema };

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const returnSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  orderNo: { type: String, required: true },
  date: { type: Date },
  returnReason: { type: String, required: true },
  returnMethod: { type: String, required: true },
  productImage: { type: String },
})

module.exports = mongoose.model('Return', returnSchema)

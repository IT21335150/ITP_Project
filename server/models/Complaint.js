// models/Complaint.js

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const complaintSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  orderNo: { type: String, required: true },
  date: { type: Date, default: Date.now },
  complaintType: { type: String, required: true },
  Description: { type: String, required: true },
  // productImage: { type: String },
})

module.exports = mongoose.model('Complaint', complaintSchema)

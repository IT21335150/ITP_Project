const express = require('express')
const router = express.Router()
const Complaint = require('../Model/Complaint') // Update the model import

// Create
router.post('/', (req, res) => {
  const newComplaint = new Complaint(req.body) // Update the model
  newComplaint
    .save()
    .then(() => res.json('Complaints Data Added Successfully!'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

// Get
router.get('/', (req, res) => {
  Complaint.find()
    .then((complaints) => res.json(complaints)) // Update the variable name
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.delete('/:id', (req, res) => {
  Complaint.findByIdAndDelete(req.params.id) // Update the model
    .then(() => res.json('Complaint Data Deleted Successfully!'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.put('/:id', (req, res) => {
  Complaint.findByIdAndUpdate(req.params.id, req.body) // Update the model
    .then(() => res.json('Complaint Data Updated Successfully!'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

// Get a complaint by ID
router.get('/:id', (req, res) => {
  Complaint.findById(req.params.id) // Update the model
    .then((complaintData) => {
      if (!complaintData) {
        return res.status(404).json('Complaint Data not found')
      }
      res.json(complaintData)
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})

module.exports = router

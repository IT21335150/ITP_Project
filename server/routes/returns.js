const express = require('express')
const router = express.Router()
const Return = require('../Model/Return')

//Create
router.post('/', (req, res) => {
  const newReturn = new Return(req.body)
  newReturn
    .save()
    .then(() => res.json('Returns Data Added Successfully!'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

//Get
router.get('/', (req, res) => {
  Return.find()
    .then((returns) => res.json(returns))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.delete('/:id', (req, res) => {
  Return.findByIdAndDelete(req.params.id)
    .then(() => res.json('Return Data Deleted Successfully!'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.put('/:id', (req, res) => {
  Return.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('Return Data Updated Successfully!'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

// Get a return by ID
router.get('/:id', (req, res) => {
  Return.findById(req.params.id)
    .then((returnData) => {
      if (!returnData) {
        return res.status(404).json('Return Data not found')
      }
      res.json(returnData)
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})
module.exports = router

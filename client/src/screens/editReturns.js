import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button, Container } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

function EditReturns() {
  const { id } = useParams() // Get the return ID from the route
  const navigate = useNavigate()

  const [returnData, setReturnData] = useState({
    name: '',
    email: '',
    orderNo: '',
    returnReason: '',
    returnMethod: '',
    productImage: '',
    date: '',
  })

  useEffect(() => {
    // Fetch the specific return data by ID
    axios
      .get(`http://localhost:4000/returns/${id}`)
      .then((response) => {
        setReturnData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching return data:', error)
      })
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setReturnData({ ...returnData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Send the updated data to your backend API
    axios
      .put(`http://localhost:4000/returns/${id}`, returnData)
      .then((response) => {
        console.log('Data updated successfully:', response.data)
        // Redirect to the returns page after successful update
        navigate('/')
      })
      .catch((error) => {
        console.error('Error updating data:', error)
      })
  }

  return (
    <Container>
      <h1>Edit Return</h1>
      <Form onSubmit={handleSubmit}>
        {/* Add form fields for editing */}
        {/* Name */}
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={returnData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Email */}
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={returnData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Order No */}
        <Form.Group controlId='orderNo'>
          <Form.Label>Order No</Form.Label>
          <Form.Control
            type='text'
            name='orderNo'
            value={returnData.orderNo}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Return Reason */}
        <Form.Group controlId='returnReason'>
          <Form.Label>Return Reason</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            name='returnReason'
            value={returnData.returnReason}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Return Method */}
        <Form.Group controlId='returnMethod'>
          <Form.Label>Return Method</Form.Label>
          <Form.Control
            type='text'
            name='returnMethod'
            value={returnData.returnMethod}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Date */}
        <Form.Group controlId='date'>
          <Form.Label>Date</Form.Label>
          <Form.Control
            type='date'
            name='date'
            value={returnData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Product Image */}
        <Form.Group controlId='productImage'>
          <Form.Label>Product Image URL</Form.Label>
          <Form.Control
            type='text'
            name='productImage'
            value={returnData.productImage}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type='submit'>Update</Button>
      </Form>
    </Container>
  )
}

export default EditReturns

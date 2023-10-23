import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button, Container } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

function EditComplaints() {
  const { id } = useParams() // Get the complaint ID from the route
  const navigate = useNavigate()

  const [complaintData, setComplaintData] = useState({
    name: '',
    email: '',
    orderNo: '',
    date: '',
    complaintType: '',
    Description: '',
  })

  useEffect(() => {
    // Fetch the specific complaint data by ID
    axios
      .get(`http://localhost:4000/complaints/${id}`)
      .then((response) => {
        setComplaintData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching complaint data:', error)
      })
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setComplaintData({ ...complaintData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Send the updated data to your backend API
    axios
      .put(`http://localhost:4000/complaints/${id}`, complaintData)
      .then((response) => {
        console.log('Data updated successfully:', response.data)
        // Redirect to the complaints page after successful update
        navigate('/complaints')
      })
      .catch((error) => {
        console.error('Error updating data:', error)
      })
  }

  return (
    <Container>
      <h1>Edit Complaint</h1>
      <Form onSubmit={handleSubmit}>
        {/* Add form fields for editing */}
        {/* Name */}
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={complaintData.name}
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
            value={complaintData.email}
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
            value={complaintData.orderNo}
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
            value={complaintData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Complaint Type */}
        <Form.Group controlId='complaintType'>
          <Form.Label>Complaint Type</Form.Label>
          <Form.Control
            type='text'
            name='complaintType'
            value={complaintData.complaintType}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Description */}
        <Form.Group controlId='Description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            name='Description'
            value={complaintData.Description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type='submit'>Update</Button>
      </Form>
    </Container>
  )
}

export default EditComplaints

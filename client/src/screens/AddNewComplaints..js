import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddNewComplaints() {
  const navigate = useNavigate()
  const [complaintData, setComplaintData] = useState({
    name: '',
    email: '',
    orderNo: '',
    date: '',
    complaintType: '',
    Description: '',
  })
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [nameError, setNameError] = useState('')
  const [orderNoError, setOrderNoError] = useState('')
  const [dateError, setdateError] = useState('')
  const [complaintTypeError, setcomplaintTypeError] = useState('')
  const [DescriptionError, setDescriptionError] = useState('')
  const [emailError, setemailError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setComplaintData({ ...complaintData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validations
     // name
     if (!complaintData.name) {
      setNameError('Name is required')
      setNameError('')
      return
    } else if (!/^[a-zA-Z][a-zA-Z\s]*$/.test(complaintData.name)) {
      setNameError('Name can not have Symbols or Numbers')
      setNameError('')
      return
    } else if (complaintData.name.length <= 2) {
      setNameError('Name must have more than 2 letters')
      setNameError('')
      return
    }
    //orderno
    if (complaintData.orderNo.length < 2) {
      setOrderNoError('Order number must be greater than 2')
      setNameError('')
      return
    }

    //complaint type
    if (!complaintData.complaintType) {
      setcomplaintTypeError('Complaint type is required')
      setNameError('')
      return
    } else if (!/^[a-zA-Z][a-zA-Z\s]*$/.test(complaintData.complaintType)) {
      setcomplaintTypeError('Complaint type can not have Symbols or Numbers')
      setNameError('')
      return
    } else if (complaintData.complaintType.length <= 2) {
      setcomplaintTypeError('Complaint type must have more than 2 letters')
      setNameError('')
      return
    }
    //description
    if (!complaintData.Description) {
      setDescriptionError('Description is required')
      setNameError('')
      return
    } else if (!/^[a-zA-Z][a-zA-Z\s]*$/.test(complaintData.Description)) {
      setDescriptionError('Description can not have Symbols or Numbers')
      setNameError('')
      return
    } else if (complaintData.Description.length <= 2) {
      setDescriptionError('Description must have more than 2 letters')
      setNameError('')
      return
    }
    //email
    if (!complaintData.email) {
      setemailError('Email is required');
      return;
    } else if (!/^[^*]*@\S+\.\S+$/.test(complaintData.email)) {
      setemailError('Invalid email format');
      setNameError('');
      return;
    }
    
    if (complaintData.orderNo.length < 2) {
      setemailError('Order number must be greater than 2')
      setNameError('')
      return
    }
    //date
    const inputDate = new Date(complaintData.date);
    const currentDate = new Date();
      if (!complaintData.date) {
        setdateError('Date is required');
         setNameError('');
         return;
}       else if (inputDate > currentDate) {
          setdateError('Invalid Date');
          setNameError('');
          return;
}

    // Send the data to your backend API to save it in the database
    axios
      .post('http://localhost:4000/complaints/', complaintData)
      .then((response) => {
        console.log('Data sent successfully:', response.data)
        setSuccessMessage('Successfully added!')
        setErrorMessage('')
        setOrderNoError('')
        setNameError('')

        // Clear the form fields
        setComplaintData({
          name: '',
          email: '',
          orderNo: '',
          date: '',
          complaintType: '',
          Description: '',
        })

        // Delay navigation
        setTimeout(() => {
          navigate('/complaints')
        }, 1000) // Delay for 1 second
      })
      .catch((error) => {
        console.error('Error sending data:', error)
        setSuccessMessage('')
        setOrderNoError('')
        setNameError('')
        setErrorMessage('Error adding data. Please try again.')
      })
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} style={{ margin: '20px' }}>
        <Form.Group as={Row} className='mb-3' controlId='name'>
          <Form.Label column sm='2'>
            Name
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              type='text'
              name='name'
              value={complaintData.name}
              onChange={handleChange}
            />
            {nameError && <div className='text-danger'>{nameError}</div>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3' controlId='email'>
          <Form.Label column sm='2'>
            Email
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              type='email'
              name='email'
              value={complaintData.email}
              onChange={handleChange}
              required
            />
            {emailError && <div className='text-danger'>{emailError}</div>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3' controlId='orderNo'>
          <Form.Label column sm='2'>
            Order No
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              type='text'
              name='orderNo'
              value={complaintData.orderNo}
              onChange={handleChange}
              required
            />
            {orderNoError && <div className='text-danger'>{orderNoError}</div>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3' controlId='date'>
          <Form.Label column sm='2'>
            Date
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              type='date'
              name='date'
              value={complaintData.date}
              onChange={handleChange}
              required
            />
            {dateError && <div className='text-danger'>{dateError}</div>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3' controlId='complaintType'>
          <Form.Label column sm='2'>
            Complaint Type
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              type='text'
              name='complaintType'
              value={complaintData.complaintType}
              onChange={handleChange}
              required
            />
            {complaintTypeError && <div className='text-danger'>{complaintTypeError}</div>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3' controlId='Description'>
          <Form.Label column sm='2'>
            Description
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              as='textarea'
              rows={3}
              name='Description'
              value={complaintData.Description}
              onChange={handleChange}
              required
            />
            {DescriptionError && <div className='text-danger'>{DescriptionError}</div>}
          </Col>
        </Form.Group>

        <Button type='submit'>Submit</Button>
      </Form>
      {successMessage && (
        <div className='alert alert-success'>{successMessage}</div>
      )}
      {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
    </div>
  )
}

export default AddNewComplaints

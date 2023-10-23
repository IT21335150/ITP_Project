import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddReturns() {
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
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [nameError, setNameError] = useState('')
  const [orderNoError, setorderNoError] = useState('')
  const [emailError, setemailError] = useState('')
  const [dateError, setdateError] = useState('')
  const [returnMethodError, setreturnMethodError] = useState('')
  const [returnReasonError, setreturnReasonError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setReturnData({ ...returnData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    //validations
    // name
    if (!returnData.name) {
      setNameError('Name is required')
      setorderNoError('')
      return
    } else if (!/^[a-zA-Z][a-zA-Z\s]*$/.test(returnData.name)) {
      setNameError('Name can not have Symbols or Numbers')
      setorderNoError('')
      return
    } else if (returnData.name.length <= 2) {
      setNameError('Name must have more than 2 letters')
      setorderNoError('')
      return
    }
    //return reason
    if (!returnData.returnReason) {
      setreturnReasonError('Return Reason is required')
      setorderNoError('')
      return
    } else if (!/^[a-zA-Z][a-zA-Z\s]*$/.test(returnData.returnReason)) {
      setreturnReasonError('Return Reason can not have Symbols or Numbers')
      setorderNoError('')
      return
    } else if (returnData.returnReason.length <= 2) {
      setreturnReasonError('Return Reason must have more than 2 letters')
      setorderNoError('')
      return
    }
    //return method
    if (!returnData.returnMethod) {
      setreturnMethodError('Return Reason is required')
      setorderNoError('')
      return
    } else if (!/^[a-zA-Z][a-zA-Z\s]*$/.test(returnData.returnMethod)) {
      setreturnMethodError('Return Method can not have Symbols or Numbers')
      setorderNoError('')
      return
    } else if (returnData.returnMethod.length <= 2) {
      setreturnMethodError('Return Method must have more than 2 letters')
      setorderNoError('')
      return
    }
    //email
    if (!returnData.email) {
      setemailError('Email is required');
      return;
    } else if (!/^[^*]*@\S+\.\S+$/.test(returnData.email)) {
      setemailError('Invalid email format');
      return;
    }
    
    if (returnData.orderNo.length < 2) {
      setorderNoError('Order number must be greater than 2')
      setNameError('')
      return
    }
    //date
    const inputDate = new Date(returnData.date);
    const currentDate = new Date();
      if (!returnData.date) {
  setdateError('Date is required');
  setNameError(''); // Clear the error for the "name" field
  return;
}       else if (inputDate > currentDate) {
          setdateError('Invalid Date');
          setNameError('');
          return;
}
    //orderno
    if (!returnData.orderNo) {
      setorderNoError('Order number is required');
      return;
    } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]+$/.test(returnData.orderNo)) {
      setorderNoError('Order number must contain both numbers and letters');
      
      return;
    }
    
    
    // Send the data to your backend API to save it in the database
    axios
      .post('http://localhost:4000/returns/', returnData)
      .then((response) => {
        console.log('Data sent successfully:', response.data)
        setSuccessMessage('Successfully added!')
        setErrorMessage('')
        setorderNoError('')
        setNameError('')
        setemailError('')
        setreturnMethodError('')
        setreturnReasonError('')
        setdateError('')
        // Clear the form fields
        setReturnData({
          name: '',
          email: '',
          orderNo: '',
          returnReason: '',
          returnMethod: '',
          productImage: '',
          date: '',
        })
        //delay
        setTimeout(() => {
          navigate('/')
        }, 1000) // Delay for 2 seconds
      })

      .catch((error) => {
        console.error('Error sending data:', error)
        setSuccessMessage('')
        setorderNoError('')
        setNameError('')
        setdateError('')
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
              value={returnData.name}
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
              value={returnData.email}
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
              value={returnData.orderNo}
              onChange={handleChange}
              required
            />
            {orderNoError && <div className='text-danger'> {orderNoError}</div>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3' controlId='returnReason'>
          <Form.Label column sm='2'>
            Return Reason
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              as='textarea'
              rows={3}
              name='returnReason'
              value={returnData.returnReason}
              onChange={handleChange}
              required
            />
            {returnReasonError && <div className='text-danger'>{returnReasonError}</div>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3' controlId='returnMethod'>
          <Form.Label column sm='2'>
            Return Method
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              type='text'
              name='returnMethod'
              value={returnData.returnMethod}
              onChange={handleChange}
              required
            />
            {returnMethodError && <div className='text-danger'>{returnMethodError}</div>}
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
              value={returnData.date}
              onChange={handleChange}
              required
            />
            {dateError && <div className='text-danger'>{dateError}</div>}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3' controlId='productImage'>
          <Form.Label column sm='2'>
            Product Image URL
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              type='text'
              name='productImage'
              value={returnData.productImage}
              onChange={handleChange}
            />
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

export default AddReturns

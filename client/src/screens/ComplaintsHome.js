import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import './styles.css' // Import your CSS file
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer'

function ComplaintsHome() {
  const [complaints, setComplaints] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const componentRef = useRef()

  useEffect(() => {
    // Fetch complaints data from your backend API here
    axios
      .get('http://localhost:4000/complaints/')
      .then((response) => {
        setComplaints(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching complaints data:', error)
      })
  }, [])

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/complaints/${id}`)
      .then(() => {
        axios.get('http://localhost:4000/complaints/').then((response) => {
          setComplaints(response.data)
        })
      })
      .catch((error) => {
        console.error('Error deleting complaint:', error)
      })
  }

  const filteredComplaints = complaints.filter((complaintData) =>
    complaintData.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: 20,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    label: {
      width: 100,
    },
    image: {
      width: 100,
      height: 100,
    },
    table: {
      width: '100%',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomColor: '#000',
      borderBottomWidth: 1,
      alignItems: 'center',
      padding: 5,
    },
    tableCell: {
      flex: 1,
      fontSize: 12,
    },
  })

  const ReportDocument = () => (
    <Document>
      <Page size='A4' style={styles.page}>
        <View>
          <Text>Complaint Report</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>#</Text>
            <Text style={styles.tableCell}>Name</Text>
            <Text style={styles.tableCell}>Email</Text>
            <Text style={styles.tableCell}>Order No</Text>
            <Text style={styles.tableCell}>Complaint Reason</Text>
            <Text style={styles.tableCell}>Complaint Method</Text>
            <Text style={styles.tableCell}>Date</Text>
          </View>
          {filteredComplaints.map((complaintData, index) => (
            <View style={styles.tableRow} key={complaintData._id}>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <Text style={styles.tableCell}>{complaintData.name}</Text>
              <Text style={styles.tableCell}>{complaintData.email}</Text>
              <Text style={styles.tableCell}>{complaintData.orderNo}</Text>
              <Text style={styles.tableCell}>
                {complaintData.complaintType}
              </Text>
              <Text style={styles.tableCell}>
                {complaintData.description}
              </Text>
              <Text style={styles.tableCell}>{complaintData.date}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )

  return (
    <div>
      <Form className='d-flex justify-content-end mb-3'>
        <Form.Control
          type='search'
          placeholder='Search by Name'
          className='me-2 w-25'
          aria-label='Search'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>

      <div ref={componentRef}>
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Order No</th>
              <th scope='col'>Complaint Reason</th>
              <th scope='col'>Complaint Method</th>
              <th scope='col'>Date</th>
              <th scope='col'>Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {filteredComplaints.map((complaintData, index) => (
              <tr key={complaintData._id}>
                <th scope='row'>{index + 1}</th>
                <td>{complaintData.name}</td>
                <td>{complaintData.email}</td>
                <td>{complaintData.orderNo}</td>
                <td>{complaintData.complaintType}</td>
                <td>{complaintData.Description}</td>
                <td>{complaintData.date}</td>
                <td>
                  <button
                    className='btn btn-danger btn-sm'
                    onClick={() => handleDelete(complaintData._id)}
                  >
                    Delete
                  </button>
                  <Link
                    style={{ marginLeft: '20px' }}
                    to={`/complaints/update/${complaintData._id}`}
                    className='btn btn-primary btn-sm'
                  >
                    Update
                  </Link>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
      <PDFDownloadLink
        document={<ReportDocument />}
        fileName='complaint_report.pdf'
      >
        {({ blob, url, loading, error }) => (
          <button className='btn btn-primary d-flex justify-content-end mb-3'>
            {loading ? 'Loading document...' : 'Download Report as PDF'}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  )
}

export default ComplaintsHome

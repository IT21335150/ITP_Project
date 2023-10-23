import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import productImage from '../images/productImage.jpg';
import Form from 'react-bootstrap/Form';
import './styles.css'; // Import your CSS file
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

function ReturnHome() {
  const [returns, setReturns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const componentRef = useRef();

  useEffect(() => {
    // Fetch returns data from your backend API here
    axios
      .get('http://localhost:4000/returns/')
      .then((response) => {
        setReturns(response.data);
      })
      .catch((error) => {
        console.error('Error fetching returns data:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/returns/${id}`)
      .then(() => {
        axios.get('http://localhost:4000/returns/').then((response) => {
          setReturns(response.data);
        });
      })
      .catch((error) => {
        console.error('Error deleting return:', error);
      });
  };

  const filteredReturns = returns.filter((returnData) =>
    returnData.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  });

  const ReportDocument = () => (
    <Document>
      <Page size='A4' style={styles.page}>
        <View>
          <Text>Return Report</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>#</Text>
            <Text style={styles.tableCell}>Name</Text>
            <Text style={styles.tableCell}>Email</Text>
            <Text style={styles.tableCell}>Order No</Text>
            <Text style={styles.tableCell}>Return Reason</Text>
            <Text style={styles.tableCell}>Return Method</Text>
            <Text style={styles.tableCell}>Date</Text>
          </View>
          {filteredReturns.map((returnData, index) => (
            <View style={styles.tableRow} key={returnData._id}>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <Text style={styles.tableCell}>{returnData.name}</Text>
              <Text style={styles.tableCell}>{returnData.email}</Text>
              <Text style={styles.tableCell}>{returnData.orderNo}</Text>
              <Text style={styles.tableCell}>{returnData.returnReason}</Text>
              <Text style={styles.tableCell}>{returnData.returnMethod}</Text>
              <Text style={styles.tableCell}>{returnData.date}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

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
              <th scope='col'>Return Reason</th>
              <th scope='col'>Return Method</th>
              <th scope='col'>Date</th>
              <th scope='col'>Product Image</th>
              <th scope='col'>Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {filteredReturns.map((returnData, index) => (
              <tr key={returnData._id}>
                <th scope='row'>{index + 1}</th>
                <td>{returnData.name}</td>
                <td>{returnData.email}</td>
                <td>{returnData.orderNo}</td>
                <td>{returnData.returnReason}</td>
                <td>{returnData.returnMethod}</td>
                <td>{returnData.date}</td>
                <td>
                  {returnData.productImage && (
                    <img src={productImage} alt='' width='100' height='100' />
                  )}
                </td>
                <td>
                  <button
                    className='btn btn-danger btn-sm'
                    onClick={() => handleDelete(returnData._id)}
                  >
                    Delete
                  </button>
                  <Link
                    style={{ marginLeft: '20px' }}
                    to={`/returns/update/${returnData._id}`}
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
        fileName='return_report.pdf'
      >
        {({ blob, url, loading, error }) => (
          <button
            className='btn btn-primary d-flex justify-content-end mb-3'
            
          >
            {loading ? 'Loading document...' : 'Download Report as PDF'}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  )
}

export default ReturnHome;

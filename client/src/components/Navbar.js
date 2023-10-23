import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCartTotalQuantity } from '../features/slice/cartSlice';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
const Navbar = ({click}) => {
    const totalQuantity = useSelector(getCartTotalQuantity)
  return (
    <nav className='navbar'>

        <Container fluid>
        <Navbar.Brand href='#'>Returns And Complaints</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href='/'>Returns</Nav.Link>
            <Nav.Link href='/complaints'>Complaints</Nav.Link>
            <NavDropdown title='Add' id='navbarScrollingDropdown'>
              <NavDropdown.Item href='/addNewReturns'>
                Add New Returns
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/addNewComplaints'>
                Add New Complaint
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
        
        <div className="navbar-logo">
            <Link to="/"><h2>Shopping cart</h2></Link>
        </div>
        {/** links */}
        <ul className="navbar-links">
            <li>
                <Link to="/cart" className='cart-link'>
                    <i className='fas fa-shopping-cart'></i>
                    <span>
                        Cart
                        <span className='cartlogo-badge'>{totalQuantity}</span>
                    </span> 
                    
                </Link>
            </li>
        </ul>
        
        <div className="hamburger-menu" onClick={click}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </nav>
  )
}

export default Navbar
import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCartTotalQuantity } from '../features/slice/cartSlice';

const Navbar = ({click}) => {
    const totalQuantity = useSelector(getCartTotalQuantity)
  return (
    <nav className='navbar'>
          <div className="container-fluid">
             <h4 class="text-dark">SUPPLIER MANAGEMENT</h4>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item text-dark">
                    <NavLink className="nav-link  text-dark" aria-current="page" exact to="/" >HOME</NavLink>
                </li>
                <li className="nav-item text-dark">
                    <NavLink className="nav-link text-dark" exact to="/add" activeClassName="active">INSERT</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-dark" exact to="/edit" activeClassName="active">VIEW</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link  text-dark" exact to="/view" activeClassName="active">REPORT </NavLink>
                </li>
            </ul>
        </div>
        </div>
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
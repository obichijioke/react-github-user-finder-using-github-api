import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'


function Navbar(props) {
     return (
            <nav className='bg-dark navbar'>
                <h1><i className={props.icon}></i>{props.title}</h1>
                <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                </ul>
            </nav>
        )
    
}

Navbar.defaultProps = {
    title: "GitHub User Finder",
    icon: "fab fa-github"
  };
  Navbar.propTypes = {
      title: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
  }

export default Navbar

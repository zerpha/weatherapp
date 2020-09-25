import React from 'react'
import {Navbar} from 'react-bootstrap'
import './head.style.css'


const Head = () => {
    return(
        <Navbar className = "navi">
            <Navbar.Brand>
                <img
                    src= {require('C:/Users/henry/OneDrive/Documents/weatherapp/src/photos/weather-icon.png')}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="logo"
                />
                &nbsp; Check the Weather!
            </Navbar.Brand>

        </Navbar>
    );
  };

  export default Head;
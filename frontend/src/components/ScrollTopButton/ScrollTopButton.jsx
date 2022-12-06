// import React from 'react';
import './ScrollTopButton.scss';
import { IMAGE_TYPE_GIFS, IMAGE_TYPE_IMAGES } from "../../App";
import React, {useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import { faAngleUp, faBorderNone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { Button } from './Styles'

const ScrollTopButton = () =>{
  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 60){
      setVisible(true)
    } 
    else if (scrolled <= 60){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'auto'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    // <Button>
    //  <FaArrowCircleUp onClick={scrollToTop} 
    //  style={{display: visible ? 'inline' : 'none'}} />
    // </Button>
    // <div className="ScrollTopSquare" style={{display: visible ? 'flex' : 'none'}}>
        <button className="ScrollTopButton" onClick={scrollToTop} style={{display: visible ? 'flex' : 'none'}}>
          <div id="center">
          <div id="rectangle"></div>
          <FontAwesomeIcon className="ScrollIcon"
            style={{display: visible ? 'flex' : 'none', color: "white"}}
            icon={faAngleUp}
          />
          </div>
        </button>
    // </div>
  );
}
  
export default ScrollTopButton;


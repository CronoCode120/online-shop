import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <div className='footer'>
      <p>2023 Immerse All rights reserved</p>
      <p className='social-icons'>
        <FontAwesomeIcon icon={faTwitter} size='xl' className='social-icon' />
        <FontAwesomeIcon icon={faInstagram} size='xl' className='social-icon' />
        <FontAwesomeIcon icon={faLinkedin} size='xl' className='social-icon' />
      </p>
    </div>
  )
}

export default Footer;
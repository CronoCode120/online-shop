import React, { useEffect } from 'react';
import Link from 'next/link';
import { useStateContext } from '@/context/StateContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';

const Success = () => {

  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, []);

  return (
    <div className='success-container'>
        <div className='success'>
            <FontAwesomeIcon icon={faGift} size='2xl' color='#4638E8' />
            <h3>Thank you for your purchase!</h3>
            <p style={{'fontFamily':'"Poppins", sans-serif'}}>Check your email inbox for the receipt.</p>
            <p style={{'fontFamily':'"Quicksand", sans-serif', 'margin':'20px 30px'}}>If you have any doubt, please contact us through <Link className='link' href='mailto:immerse.help@example.com' style={{'fontWeight':'600', 'color':'#201969'}}>immerse.help@example.com</Link>.</p>
            <Link href='/'>
                <button type='button' className='success-btn'>Go back to main page</button>
            </Link>
        </div>
    </div>
  )
}

export default Success

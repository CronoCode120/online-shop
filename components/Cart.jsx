import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTrashCan, faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useStateContext } from '@/context/StateContext';
import { urlFor } from '@/lib/client';
import emptyCart from '../public/empty_cart.png'
import Image from 'next/image';
import getStripe from '@/lib/getStripe';
import { toast } from 'react-hot-toast';

const Cart = () => {

  const { setShowCart, cartItems, totalPrice, totalQuantities, removeFromCart, toggleCartItemQty, calculateDiscount } = useStateContext()

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cartItems}),
    });

    console.log(response);

    if(response.statusCode === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecting...', {
      style: {
        fontFamily: '"Quicksand", sans-serif',
        fontWeight: '600',
        borderRadius: '30px',
        boxShadow: '0 0 5px 2px black'
      }
    });
    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className='cart-wrapper'>
      <div className='cart-container'>
        <div className='cart-head'>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size='xl'
            onClick={() => setShowCart(false)}
            style={{"cursor": "pointer"}}
          />
          <div>
            <h4>{totalQuantities} items</h4>
            <h3>Your cart</h3>
          </div>
        </div>
        {cartItems.length > 0 ? (
        <div className='active-cart'>
          <div className='cart-items-wrapper'>
            <div className='cart-items'>
              {cartItems.map(item => (
                <div className='cart-product' key={item._id}>
                  <img
                    src={urlFor(item.image[0])}
                    alt='A picture of the product'
                    width={100}
                    height={100}
                  />
                  <div>
                    <div className='cart-item-details'>
                      <p>{item.name}</p>
                      {item.discount ? (
                        <p className='discount-container' style={{'fontWeight':'600', 'fontFamily':'"Poppins", sans-serif', 'fontSize':'16px', 'justifyContent':'flex-end !important'}}><span className='prev-price'>${item.price.toFixed(2)}</span><span className='discount-price'>${calculateDiscount(item.price, item.discount)}</span></p>
                      ) : (
                        <p style={{'fontWeight':'600', 'fontFamily':'"Poppins", sans-serif', 'fontSize':'16px'}}>${item.price}</p>
                      )}
                      <div className='quant-selector'>
                        <FontAwesomeIcon icon={faCircleMinus} size='xl' onClick={() => toggleCartItemQty(item, 'dec')} style={{"userSelect": "none", "cursor": "pointer", 'color': 'white'}} />
                        <p className='qty'>{item.quantity}</p>
                        <FontAwesomeIcon icon={faCirclePlus} size='xl' onClick={() => toggleCartItemQty(item, 'inc')} style={{"userSelect": "none", "cursor": "pointer", 'color': 'white'}} />
                      </div>
                    </div>
                    <FontAwesomeIcon icon={faTrashCan} onClick={() => removeFromCart(item)} className='trashcan'/>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='pay-panel'>
            <span>
              <p>Subtotal: </p>
              <p>${totalPrice.toFixed(2)}</p>
            </span>
            <button type='button' onClick={handleCheckout}>Pay now</button>
          </div>
        </div>
        ) : (
          <div className='empty-cart'>
            <h2>Your shopping cart is empty.</h2>
            <Image
              className='empty-cart-img'
              src={emptyCart}
              width={300}
              height={300}
            />
          </div>
        )}
        </div>
    </div>
  )
}

export default Cart;

import React from 'react';
import Link from 'next/link';
import { urlFor } from '@/lib/client';
import { useStateContext } from '@/context/StateContext';

const Product = ({ product: { image, name, price, slug, discount } }) => {
  const { calculateDiscount } = useStateContext();
  
  return (
    <div>
      <Link className='link' href={`/product/${slug.current}`}>
        <div className='product-container'>
          <img
            src={urlFor(image && image[0])}
            width={150}
            height={150}
            alt='Image of the product'
            className='product-image' />
          <div className='product-info'>
            <p className='product-name'>{name}</p>
            {discount ? (
              <div>
                <p style={{'marginBottom':'0'}}>$<span className='discount-price'>{calculateDiscount(price, discount).toFixed(2)}</span></p>
                <p className='prev-price' style={{'margin':'0', 'fontSize':'10px', 'textAlign':'right'}}>${price.toFixed(2)}</p>
              </div>
            ) : (
              <p className='product-price'>${price.toFixed(2)}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Product;

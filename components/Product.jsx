import React from 'react';
import Link from 'next/link';
import { urlFor } from '@/lib/client';

const Product = ({ product: { image, name, price, slug } }) => {
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
            <p className='product-price'>${price.toFixed(2)}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Product;

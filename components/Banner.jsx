import React from 'react';
import { urlFor } from '@/lib/client';
import Link from 'next/link';

const Banner = ({ banner: { product, image, smallText, midText, bigText, buttonText, discount, saleTime, desc, slug } }) => {
  return (
    <div className='banner-container'>
      <div className='banner-left'>
        <p className='smallText'>{smallText}</p>
        <h3 className='midText'>{midText}</h3>
        <h1 className='bigText'>{bigText}</h1>
        <h1 className='discount'>{discount}</h1>
        <Link className='link' href={`/product/${slug.current}`}>
          <button type='button' className='banner-btn'>{buttonText}</button>
        </Link>
        <p className='sale-time'>{saleTime}</p>
      </div>
      {image && (
          <img
            src={urlFor(image)}
            className='banner-img'
            alt={`${product}`}
          />
        )}
      <p className='banner-desc'>{desc}</p>
    </div>
  )
}

export default Banner;
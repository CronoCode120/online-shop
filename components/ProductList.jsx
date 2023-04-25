import React from 'react';
import { urlFor } from '@/lib/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { useStateContext } from '@/context/StateContext';

const ProductList = ({ searchKey, products }) => {

  const { addToCart } = useStateContext();

  const searcher = (searchString, product) => {
    let regExp = new RegExp(searchString, 'ig');
    let check1 = regExp.test(product.name);
    let check2 = regExp.test(product.details);
    let check3 = product.category.filter(categ => regExp.test(categ));

    if(check1 || check2 || check3.length) return true;
    return false;
  }

  return (
    <div className='list-container'>
      {products?.filter(product => searcher(searchKey, product)).map(product => (
        <div className='result-container'>
          <div className='result-info'>
          <Link href={`/product/${product.slug.current}`}><img src={urlFor(product.image && product.image[0])} width={150} height={150} /></Link>
            <div className='result-details'>
            <Link href={`/product/${product.slug.current}`} className='link'><p className='result-title'>{product.name}</p></Link>
              <div className='stars'>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <p>(0)</p>
              </div>
              <p className='result-desc'>{product.details}</p>
            </div>
          </div>
          <div className='result-pay'>
            {product.discount ? (
              <div className='discount-container2'>
                <p className='prev-price2' style={{'fontFamily':'"Poppins", sans-serif'}}>${product.price.toFixed(2)}</p>
                <h4 className='discount-price' style={{'fontFamily':'"Poppins", sans-serif', 'margin':'0'}}>${calculateDiscount(product.price, product.discount)}</h4>
              </div>
            ) : (
              <h4>${product.price.toFixed(2)}</h4>
            )}
            <button
              type='button'
              className='result-btn add'
              onClick={() => addToCart(product, 1)}
              >Add to Cart</button>
            <Link href={`/product/${product.slug.current}`}><button type='button' className='result-btn'>Discover more</button></Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList;

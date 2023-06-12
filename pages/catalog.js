import React from 'react';
import { ProductList } from '@/components';
import { useStateContext } from '@/context/StateContext';
import { useState } from 'react';
import { client } from '@/lib/client';

const Catalog = ({ products }) => {
  const { searchKey, calculateDiscount } = useStateContext();
  const [ sortOrder, setSortOrder ] = useState('LtH');
  
  const updatedProducts = [];
  products.forEach(product => {
    if(product.discount) {
      let newPrice = calculateDiscount(product.price, product.discount);
      updatedProducts.push({...product, price: price});
    } else {
      updatedProducts.push(product);
    }
  });

  return (
    <div>
        <div className='filter-container'>
          <label for='price-filter'>Price: </label>
          <select id='price-filter' onChange={event => setSortOrder(event.target.value)}>
            <option value='LtH' selected>Low to High</option>
            <option value='HtL'>High to Low</option>
          </select>
        </div>
        <div className='results-container'>
            <ProductList searchKey={searchKey} products={sortOrder === 'LtH' ? updatedProducts.sort((a, b) => a.price - b.price) : updatedProducts.sort((a, b) => b.price - a.price)} />
        </div>
    </div>
  )
}

export default Catalog;

export async function getServerSideProps() {
    const prodQuery = '*[_type == "product"]';
    const products = await client.fetch(prodQuery);
  
    return {
      props: { products }
    }
}

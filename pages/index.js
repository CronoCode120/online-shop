import React from 'react';
import { client } from '../lib/client';
import { Product } from '@/components';
import { Banner } from '@/components';
const Home = ({ products, banner }) => {
  return (
    <div className='main-container'>
      <div className='banner-wrapper'>
        <Banner banner={banner[0]} />
      </div>

      <div className='products-heading'>
        <h3>Most Popular Products</h3>
      </div>
      
      <div className='popular-products'>
          {products?.map((item) => (
              <Product
                key={item._id}
                product={item}
                className='popular-item'
              />
          ))}
      </div>

    </div>
  )
}

export async function getServerSideProps() {
  const prodQuery = '*[_type == "product" && "Popular" in category]';
  const bannerQuery = '*[_type == "banner"]';

  const products = await client.fetch(prodQuery);
  const banner = await client.fetch(bannerQuery);

  return {
    props: { products, banner }
  }
}

export default Home;

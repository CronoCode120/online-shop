import React, { useEffect, useState } from 'react';
import { urlFor, client } from '@/lib/client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight, faCircleChevronLeft, faSquarePlus, faSquareMinus, faCartPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useStateContext } from '@/context/StateContext';

const ProductPage = ({ curProduct, products }) => {

  const { image, price, details, name, _id } = curProduct;

  const { qty, incQty, decQty, setQty, addToCart } = useStateContext();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let slide = document.querySelector(".showcase");
    slide.scrollLeft = 0;
    document.querySelector(".move-left").style.display = "none";
    setQty(1);
    setIndex(0);
  }, [_id]);
  
  const moveLeft = () => {
    var slide = document.querySelector(".showcase");
    slide.scrollLeft = slide.scrollLeft - 660;
    if (slide.scrollLeft <= 0) {
      document.querySelector(".move-left").style.display = 'none';
    }
    document.querySelector(".move-right").style.display = 'block';
  }

  const moveRight = () => {
    var slide = document.querySelector(".showcase");
    slide.scrollLeft = slide.scrollLeft + 660;
    if (slide.scrollLeft + slide.clientWidth >= window.innerWidth) {
      document.querySelector(".move-right").style.display = 'none';
    }
    document.querySelector(".move-left").style.display = 'block';
  }

  return (
    <div className='product-page-container'>
      <div className='product-wrapper'>
        {image && (
            <div className='img-container'>
              <div className='small-img'>
                {image.map((img, i) => (
                  <img
                  src={urlFor(img)}
                  alt='A picture of the product'
                  width={100}
                  height={100}
                  key={urlFor(img)}
                  onMouseEnter={() => {
                    setIndex(i)
                  }}
                  className={i == index ? 'selected' : ''}
                  />
                  ))}
              </div>
              <img
                src={urlFor(image[index])}
                alt='A picture of the product'
              />
            </div>
        )}
        <div className='product-details'>
          <h1 style={{'fontFamily':'"Montserrat", sans-serif'}}>{name}</h1>
          <div className='stars product-page'>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <p>(0)</p>
          </div>
          <p style={{'fontFamily':'"Poppins", sans-serif', 'fontWeight': '600', 'margin-top':'40px'}}>Description:</p>
          <p style={{'fontFamily': '"Quicksand", sans-serif'}}>{details}</p>
          <h2 style={{'fontFamily':'"Poppins", sans-serif'}}>${price.toFixed(2)}</h2>
          <div>
            <div className='quant-selector'>
              <FontAwesomeIcon icon={faSquareMinus} size='2xl' onClick={decQty} style={{"userSelect": "none", "cursor": "pointer"}} />
              <p className='qty'>{qty}</p>
              <FontAwesomeIcon icon={faSquarePlus} size='2xl' onClick={incQty} style={{"userSelect": "none", "cursor": "pointer"}} />
            </div>
            <button className='add-btn' type='button' onClick={() => addToCart(curProduct, qty)}>Add to Cart <FontAwesomeIcon icon={faCartPlus} size='xl' /></button>
          </div>
        </div>
      </div>
      <div className='accordion'>
        <div className='panel'>
          <h3 className='panel-label' onClick={event => {
            event.target.nextSibling.classList.toggle('active');
            event.target.children[0].classList.toggle('arrow-up');
          }}>Features <FontAwesomeIcon className='accordion-arrow' icon={faChevronDown} /></h3>
          <div className='panel-content'>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
              <li>Feature 4</li>
              <li>Feature 5</li>
            </ul>
          </div>
        </div>
        <div className='panel'>
          <h3 className='panel-label' onClick={event => {
            event.target.nextSibling.classList.toggle('active');
            event.target.children[0].classList.toggle('arrow-up');
          }}>Materials <FontAwesomeIcon className='accordion-arrow' icon={faChevronDown} /></h3>
          <div className='panel-content'>
            <ul>
              <li>Material 1</li>
              <li>Material 2</li>
              <li>Material 3</li>
              <li>Material 4</li>
              <li>Material 5</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='other-products'>
        <h2>You may like these products</h2>
        <div className='showcase'>
          <FontAwesomeIcon className='move-left' icon={faCircleChevronLeft} size='2xl' onClick={moveLeft} />
          <FontAwesomeIcon className='move-right' icon={faCircleChevronRight} size='2xl' onClick={moveRight} />
          {products?.filter(el => el._id !== _id).map((item) => (
            <Link key={item._id} className='link' href={`/product/${item.slug.current}`}>
              <img
                src={urlFor(item.image && item.image[0])}
                width={200}
                height={200}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductPage;

export const getStaticPaths = async () => {
    const query = `*[_type == 'product']{
        slug {
            current
        }
    }`;
    const slugs = await client.fetch(query);
    const paths = slugs.map((obj) => ({
        params: {
            slug: obj.slug.current
        }
    }));

    return {
        paths,
        fallback: false
    };
}

export const getStaticProps = async ({params: {slug}}) => {
  const query = `*[_type == 'product' && slug.current == '${slug}'][0]`;
  const productsQuery = `*[_type == 'product']`;
  const curProduct = await client.fetch(query);
  const products = await client.fetch(productsQuery);
  return {
    props: { curProduct, products }
  };
}
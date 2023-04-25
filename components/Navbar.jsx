import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useStateContext } from '@/context/StateContext';
import Cart from './Cart';

const Navbar = () => {

  const { totalQuantities, showCart, setShowCart, searchKey, changeSearchKey } = useStateContext();

  return (
    <div className='navbar-container'>
      <Link className='link' href='/'>
        <p className='logo'>immerse</p>
      </Link>
      <div className='search-box'>
        <input type="text" placeholder='Search' value={searchKey} onChange={(event) => changeSearchKey(event.target.value)} onKeyUp={event => {
          if(event.key === 'Enter' && searchKey !== '') {
            window.location.href = '/catalog';
          } 
        }} />
        <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' style={{'color':'white'}} onClick={() => {
          if (searchKey !== '') {
            window.location.href = '/catalog';
          }
        }} />
      </div>
      <FontAwesomeIcon icon={faCartShopping} size='lg' onClick={() => setShowCart(true)} style={{"cursor": "pointer", 'color':'white'}} />
      {totalQuantities > 0 && <span className='cart-item-quant'>{totalQuantities}</span>}
      {showCart && <Cart />}
    </div>
  )
}

export default Navbar;
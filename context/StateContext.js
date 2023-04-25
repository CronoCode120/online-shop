import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import added from '../public/cart-arrow-down-solid.svg'

const Context = createContext();

const StateContext = ({ children }) => {
    const [searchKey, setSearchKey] = useState('');

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCartItems && storedCartItems.length > 0) {
            setCartItems(storedCartItems);

            let storedPrice = 0;
            let storedQuantities = 0;
            storedCartItems.forEach(item => {
                storedPrice += Math.round(item.price * item.quantity * 100) / 100;
                storedQuantities += item.quantity;
            });
            setTotalPrice(storedPrice);
            setTotalQuantities(storedQuantities);
        }

        const handleStorageChange = () => {
            const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
            if (storedCartItems && storedCartItems.length > 0) {
                setCartItems(storedCartItems);

                let storedPrice = 0;
                let storedQuantities = 0;
                storedCartItems.forEach(item => {
                    storedPrice += Math.round(item.price * item.quantity * 100) / 100;
                    storedQuantities += item.quantity;
                });
                setTotalPrice(storedPrice);
                setTotalQuantities(storedQuantities);
            }
        }

        window.addEventListener('storage', handleStorageChange);

        if (sessionStorage.getItem('searchKey')) {
            setSearchKey(sessionStorage.getItem('searchKey'));
        }
    }, []);

    const addToCart = (product, quantity) => {
        let checkProductInCart = cartItems.find(item => item._id == product._id);
        if (checkProductInCart) {
            const updatedCartItems = cartItems.map(cartProduct => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, {...product}]);
        }
        setTotalPrice(prevTotalPrice => {
            let newPrice = prevTotalPrice + Number(product.price.toFixed(2)) * product.quantity;
            return Number(newPrice.toFixed(2));
        });
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity);

        toast.success('Added to Cart', {
            style: {
                fontFamily: '"Quicksand", sans-serif',
                fontWeight: '600',
                borderRadius: '30px',
                boxShadow: '0 0 5px 2px black'
            }
        });
    }

    const removeFromCart = (product) => {
        let foundProduct = cartItems.find(item => item._id == product._id);
        const updatedCartItems = [...cartItems].toSpliced(cartItems.indexOf(foundProduct), 1);
        setCartItems(updatedCartItems);

        setTotalPrice(prevTotalPrice => {
            let newPrice = prevTotalPrice - product.price * product.quantity;
            return Number(newPrice.toFixed(2));
        });
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - product.quantity);
    }

    const toggleCartItemQty = (item, value) => {
        let foundProduct = cartItems.find(product => product._id == item._id);
        let index = cartItems.indexOf(foundProduct);

        if (value == 'dec') {
            if (item.quantity > 1) {
                setTotalQuantities(prevTotalQuantities => --prevTotalQuantities);
                setTotalPrice(prevTotalPrice => {
                    let newPrice = prevTotalPrice - foundProduct.price;
                    return Number(newPrice.toFixed(2));
                });

                let updatedProduct = {...foundProduct, quantity: --foundProduct.quantity};
                let updatedCartItems = [...cartItems].toSpliced(index, 1, {...updatedProduct});
                setCartItems(updatedCartItems);
            }
        } else if (value == 'inc') {
            setTotalQuantities(prevTotalQuantities => ++prevTotalQuantities);
            setTotalPrice(prevTotalPrice => {
                let newPrice = prevTotalPrice + foundProduct.price;
                return Number(newPrice.toFixed(2));
            });

            let updatedProduct = {...foundProduct, quantity: ++foundProduct.quantity};
            let updatedCartItems = [...cartItems].toSpliced(index, 1, {...updatedProduct});
            setCartItems(updatedCartItems);
        }
    }

    const incQty = () => {
        setQty(prevQty => ++prevQty);
    }

    const decQty = () => {
        if (qty == 1) {
            return;
        }
        setQty(prevQty => --prevQty);
    }

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [addToCart, removeFromCart, toggleCartItemQty]);

    const changeSearchKey = (newKey) => {
        setSearchKey(newKey);
        sessionStorage.setItem('searchKey', newKey);
    }

    return (
        <Context.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            setShowCart,
            addToCart,
            removeFromCart,
            toggleCartItemQty,
            incQty,
            decQty,
            setQty,
            setCartItems,
            setTotalPrice,
            setTotalQuantities,
            searchKey,
            changeSearchKey
        }}>
            {children}
        </Context.Provider>
    )
}

export default StateContext;

export const useStateContext = () => useContext(Context);
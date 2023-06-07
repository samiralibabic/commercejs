import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce';
import { Navbar, Products, Cart } from './components/'

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setCart(response.cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <>
      <Navbar totalItemsInCart={cart.total_items} />
      <Products products={products} onAddToCart={handleAddToCart} />
      <Cart cart={cart} />
    </>
  );
}

export default App

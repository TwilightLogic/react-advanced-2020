import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useFetch } from '../../9-custom-hooks/final/2-useFetch';

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/javascript-store-products';
const calculateMostExpensive = data => {
  console.log(data);

  // The most expensive value
  return (
    // `reduce()` takes TWO params(callback-function, initial-value)
    // `callback-function` takes FOUR params(accumulator, current value, index, array)
    // `callback-function` returns the `accumulator`
    // '0': is the initial value for `accumulator` (`accumulator` is `total` here)
    data.reduce((total, item) => {
      const price = item.fields.price;
      if (price > total) {
        total = price;
      }
      return total;
    }, 0) / 100
  );
};

// After you finished the `calculateMostExpensive` function
// Think about: Actually we don't really want to re-call the function again an again
// unless the most expensive value changed.
// But where dose the value come from? (from the global variable `products`)
// So we are going to fix the problem that use the `useMemo`

// REMEMBER: every time props or state changes, component re-renders

const Index = () => {
  const { products } = useFetch(url);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState(0);

  const addToCart = useCallback(() => {
    console.log(cart);
    setCart(cart + 1);
  }, [cart]);

  // `useMemo` returns the values that the first param of `useMemo` returns
  const mostExpensive = useMemo(
    () => calculateMostExpensive(products),
    [products]
  );

  return (
    <>
      <h1>Count : {count}</h1>
      <button className="btn" onClick={() => setCount(count + 1)}>
        click me
      </button>
      <h1 style={{ marginTop: '3rem' }}>cart : {cart}</h1>
      <h1>Most expensive : ${mostExpensive}</h1>
      <BigList products={products} addToCart={addToCart} />
    </>
  );
};

const BigList = React.memo(({ products, addToCart }) => {
  useEffect(() => {
    console.log('big list called');
  });
  return (
    <section className="products">
      {products.map(product => {
        return (
          <SingleProduct
            key={product.id}
            {...product}
            addToCart={addToCart}
          ></SingleProduct>
        );
      })}
    </section>
  );
});

const SingleProduct = ({ fields, addToCart }) => {
  useEffect(() => {
    // Will be called 12 times.
    // Because the `cart` state will be changed while we clicked the button
    // REMEMBER: every time props or state changes, component re-renders
    // We can fix that by using `useCallback`

    console.log('Single item called!');
  });

  let { name, price } = fields;
  price = price / 100;
  const image = fields.image[0].url;

  return (
    <article className="product">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
      <button onClick={addToCart}>add to cart</button>
    </article>
  );
};

export default Index;

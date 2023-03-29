import React, { useEffect, useState } from 'react';

import './App.css';



function App() {
const [products, setProducts] = useState([
    {name: "product 1", price: 100},
    {name: "product 2", price: 200},
]);

useEffect(() => {
  fetch('http://localhost:5000/api/products')
  .then(response => response.json())
  .then(data => setProducts(data))
}, [])

function addProduct(){
  // the ... is a spread operator that spreads the products array into a new array and asigning it to the prevtate
  // variable in this setProducts function
  setProducts(prevState => [...prevState, {name: 'product ' + (prevState.length + 1), price: (prevState.length * 100) + 100}])
}

  return (
    <div className='app'>
      <h1 style={{color: "blue"}}>Re-Store</h1>
      <ul>
        {products.map((p, index) => (
          <li key={index}>
            {p.name} - {p.price}
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;

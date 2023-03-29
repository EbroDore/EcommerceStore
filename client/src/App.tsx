import React, { useEffect, useState } from "react";

import "./App.css";
import { Product } from "./product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  function addProduct() {
    // the ... is a spread operator that spreads the products array into a new array and asigning it to the prevtate
    // variable in this setProducts function
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 101,
        name: "product " + (prevState.length + 1),
        price: prevState.length * 100 + 100,
        brand: "some brand",
        description: "Some description",
        pictureUrl: "http://picsum.photos/200",
      },
    ]);
  }

  return (
    <div className="app">
      <h1 style={{ color: "blue" }}>Re-Store</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;

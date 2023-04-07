import React, { useEffect, useState } from "react";

import './styles.css';
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

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
    <div>
      <CssBaseline/>
      <Header />
      <Container>
      <Catalog products={products} addProduct={addProduct}/>
      </Container>
      
 
    </div>
  );
}

export default App;

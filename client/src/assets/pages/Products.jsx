import axios from "axios";
import React, { useState, useEffect } from "react";

const Products = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products/");
        console.log("this is the result", res.send);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, []);
  return <div>hello Product</div>;
};

export default Products;

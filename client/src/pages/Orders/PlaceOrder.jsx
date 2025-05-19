import { useState, useEffect } from "react";
import axios from "axios";

const PlaceOrder = () => {
  const [loadingBusinesses, setLoadingBusinesses] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [businessesNames, setBusinessesNames] = useState([]);

  useEffect(() => {
    const fetchBusinessName = async () => {
      try {
        const res = await axios.get("http://localhost:5000/customers/");
        setLoadingBusinesses(false);
        setBusinessesNames([res.data]);
        console.log(res);
      } catch (err) {
        console.log("Error Fetching Businesses", err);
      }
    };

    fetchBusinessName();
  }, []);

  // // Businesses Name Select Input
  // const displayBusinessesNameSelect = () => {
  //     return {
  //         setBusinessesNames.map(item)
  //     }
  // }
  return (
    <div className="mx-auto w-full px-2 sm:px-8 lg:px-10 dark:bg-gray-800 dark:text-white">
      <p>Hello World</p>
    </div>
  );
};

export default PlaceOrder;

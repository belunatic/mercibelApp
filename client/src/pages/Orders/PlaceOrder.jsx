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
        setBusinessesNames([...res.data]);
        console.log([...res.data]);
      } catch (err) {
        console.log("Error Fetching Businesses", err);
      }
    };

    fetchBusinessName();
  }, []);

  // Businesses Name Select Input
  const displayBusinessesNameSelect = () => {
    return (
      <div className="col-span-6 sm:col-span-2">
        <label
          htmlFor="customerName"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Type
        </label>
        <select
          name="customerName"
          id="customerName"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
          // onChange={handleChange}
          value={businessesNames[0].customerName || ""}
          required
        >
          {/* set up the options */}
          {businessesNames.map((item) => {
            return (
              <option key={item._id} value={item.customerName}>
                {item.customerName}
              </option>
            );
          })}
        </select>
      </div>
    );
  };
  return (
    <div className="mx-auto w-full px-2 sm:px-8 lg:px-10 dark:bg-gray-800 dark:text-white">
      <form>
        {loadingBusinesses
          ? "LoadingBusinesses"
          : displayBusinessesNameSelect()}
      </form>
    </div>
  );
};

export default PlaceOrder;

import { useState, useEffect } from "react";
import axios from "axios";

const PlaceOrder = () => {
  const [loadingCustomer, setLoadingCustomer] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [customerNames, setCustomerNames] = useState([]);

  //users input
  const [customerSelected, setCustomerSelected] = useState({});

  //retrieve the Customers
  useEffect(() => {
    const fetchCustomerName = async () => {
      try {
        const res = await axios.get("http://localhost:5000/customers/");
        setLoadingCustomer(false);
        setCustomerNames([...res.data]);
        //set the a default selected item
        setCustomerSelected((prevState) => ({
          ...prevState,
          id: res.data[0]._id,
          customerName: res.data[0].customerName,
        }));
        console.log([...res.data]);
        console.log(customerSelected);
      } catch (err) {
        console.log("Error Fetching Customer", err);
      }
    };

    fetchCustomerName();
  }, []);

  //Customer select customer change
  const customerSelectChangeHandle = (event) => {
    setCustomerSelected({
      //**** find a way to get the id */
      customerName: event.target.value,
    });
    console.log(customerSelected, customerSelected.id);
  };

  // Customer Name Select Input
  const displayCustomerNameSelect = () => {
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
          onChange={customerSelectChangeHandle}
          value={customerSelected["customerName"] || ""}
          required
        >
          {/* set up the options */}
          {customerNames.map((item) => {
            return (
              <option
                key={item._id}
                data-id={item._id}
                value={item.customerName}
              >
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
        {loadingCustomer ? "LoadingCustomer" : displayCustomerNameSelect()}
      </form>
    </div>
  );
};

export default PlaceOrder;

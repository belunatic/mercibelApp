import { useState, useEffect } from "react";
import axios from "axios";

const PlaceOrder = () => {
  const [loadingCustomer, setLoadingCustomer] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [customerNames, setCustomerNames] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);

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

  //retrieve the products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products/");
        setLoadingProducts(false);
        setProducts([...res.data]);
        console.log("These are the products", products);
      } catch (err) {
        console.log("Error fetching products", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    return getTotal();
  }, [orderList]);

  //Customer select customer change
  const customerSelectChangeHandle = (e) => {
    //find the customer selected using it ID
    const customerNameOrder = customerNames.find(
      (customer) => customer._id === e.target.value,
    );
    //update the customer selected state
    setCustomerSelected((prevState) => ({
      ...prevState,
      id: customerNameOrder._id,
      customerName: customerNameOrder.customerName,
    }));
  };

  // Customer Name Select Input
  const displayCustomerNameSelect = () => {
    return (
      <div className="col-span-6 sm:col-span-2">
        <label
          htmlFor="customerName"
          className="mb-2 block text-sm text-xl font-medium font-semibold text-gray-900 dark:text-white"
        >
          Customer
        </label>
        <select
          name="customerName"
          id="customerName"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
          onChange={customerSelectChangeHandle}
          value={customerSelected["id"] || ""}
          required
        >
          {/* set up the options */}
          {customerNames.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {item.customerName}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  //display the products
  const displayProducts = () => {
    return (
      <div className="flex flex-wrap justify-start gap-2 py-4">
        {products.map((product) => {
          return (
            <div
              className="w-1/2 cursor-pointer border-2 p-4 md:w-1/4"
              key={product._id}
              onClick={() => handleOrderList(product)}
            >
              {product.name}
            </div>
          );
        })}
      </div>
    );
  };

  // handle Order List
  const handleOrderList = (productObj) => {
    const { _id, name, price } = productObj;
    //find the index of product
    const index = orderList.findIndex((item) => item.id === _id);
    //if found
    //get the count and increase it by 1
    if (index !== -1) {
      setOrderList(
        orderList.map((item) => {
          if (item.id === _id) {
            //update the item count
            return { ...item, count: item.count + 1 };
          }
          //if not matched return the item
          return item;
        }),
      );
    }
    //if item not found added it to the orderList
    else {
      setOrderList([...orderList, { id: _id, name, price, count: 1 }]);
    }
  };

  //get the total of the order
  const getTotal = () => {
    const total = orderList.reduce((acc, cur) => {
      console.log(acc);
      return acc + Number(cur.price) * cur.count;
    }, 0);
    setTotalOrder(total);
  };

  //update the the product count
  const handleProductCount = (e, index, item) => {
    //use the index to update the product quantity
    orderList[index] = { ...item, count: e.target.value };
    //then set the new orderlist
    setOrderList([...orderList]);
  };

  const handleDeleteProductItem = (id) => {
    console.log(orderList);
    console.log(id);
    const updateOrderList = orderList.filter((item) => item.id !== id);
    console.log(updateOrderList);
    setOrderList([...updateOrderList]);
  };

  //Output in front-end
  return (
    <div className="mx-auto w-full px-2 sm:px-8 lg:px-10 dark:bg-gray-800 dark:text-white">
      {/* {show the client dropdown list} */}
      {loadingCustomer ? "Loading Customer" : displayCustomerNameSelect()}
      <div className="flex justify-between gap-2">
        <div className="my-4 w-1/2">
          <h3 className="text-xl font-semibold">Products</h3>
          {loadingProducts ? "Loading Products" : displayProducts()}
        </div>
        <div className="w-1/2 py-4">
          <h3 className="text-xl font-semibold">Order List:</h3>
          <table className="w-full table-auto border-separate border-spacing-y-2.5 py-4 text-left">
            <tr>
              <th colSpan={2}>Item</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
            {orderList.map((item, index) => (
              <tr key={item._id}>
                <td colSpan={2}>{item.name}</td>
                <td>Tsh {item.price}</td>
                <td className="flex gap-x-2">
                  <input
                    type="number"
                    name="productCount"
                    onChange={(e) => handleProductCount(e, index, item)}
                    value={item.count || 0}
                    className="border-1 ps-2"
                  />
                  <a
                    onClick={() => handleDeleteProductItem(item.id)}
                    className="cursor-pointer text-red-500 hover:text-red-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
            <tr className="mx-10 border-t-2">
              <td colSpan={3} className="font-bold">
                Total
              </td>
              <td className="border-t-2">Tsh {totalOrder}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

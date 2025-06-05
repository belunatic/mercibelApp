import { useState, useEffect } from "react";
import axios from "axios";
import { UseAuthContext } from "../../context/AuthContext";
import ToastUtil from "../../util/ToastUtil";
import OrderListDisplay from "../../components/OrderListDisplay";

const PlaceOrder = () => {
  const { loggedInUser, toastMessage } = UseAuthContext();

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
          customerId: res.data[0]._id,
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
      customerId: customerNameOrder._id,
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
          value={customerSelected["customerId"] || ""}
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

  const displayOrderList = () => {
    return (
      <OrderListDisplay
        orderList={orderList}
        handleDeleteProductItem={handleDeleteProductItem}
        handleProductCount={handleProductCount}
        totalOrder={totalOrder}
      ></OrderListDisplay>
    );
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

  const handleSubmitOrderList = async () => {
    // construct the final order list
    const finalOrderList = {
      ...customerSelected,
      orderList: [...orderList],
      total: totalOrder,
      delivered: false,
      createdBy: loggedInUser.id,
    };
    try {
      const res = await axios.post("http://localhost:5000/order/", {
        ...finalOrderList,
      });
      if (res.status === 201) {
        console.log(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
    console.log(finalOrderList);
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
          {displayOrderList()}
        </div>
      </div>
      {orderList.length === 0 ? (
        ""
      ) : (
        <div className="flex justify-center">
          <button
            className="m-4 w-1/2 cursor-pointer bg-green-500 px-8 py-4"
            onClick={handleSubmitOrderList}
          >
            Submit Order
          </button>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;

import { useEffect, useState } from "react";
import ToastUtil from "../../util/ToastUtil";
import axios from "axios";
import { UseAuthContext } from "../../context/AuthContext";

const Orders = () => {
  const { toastMessage, loggedInUser } = UseAuthContext();
  const [orders, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch Order from serve
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios("http://localhost:5000/orders/");
        const data = await res.data;
        console.log(res.data);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        toastMessage("Error fetching Customer", false);
        console.error("Error fetching customers:", error);
      }
    };

    fetchOrders();
  }, []);

  //display Orders
  const displayOrder = () => {
    return (
      <div className="flex flex-col justify-evenly gap-y-4">
        <div className="flex border-b-2">
          <p className="w-2/6 text-left text-xl font-semibold">Customer</p>
          <p className="w-1/6 text-xl font-semibold">Paid</p>
          <p className="w-1/6 text-xl font-semibold">Delivered</p>
          <p className="w-1/6 text-xl font-semibold">Order Date</p>
          <p className="w-1/6 text-xl font-semibold"></p>
        </div>
        {orders.map((order) => {
          return (
            <div className="flex border-b-1 pb-2">
              <p className="text-l w-2/6 text-left font-semibold">
                {order.customerName}
              </p>
              <p className="text-l w-1/6 self-center font-semibold">
                {!order.paid ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="red"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="green"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </p>
              <p className="text-l w-1/6 text-center font-semibold">
                {!order.delivered ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="red"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="green"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </p>
              <p className="text-l w-1/6 font-semibold">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-GB")
                  : ""}
              </p>
              <p className="text-l w-1/6 font-semibold">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="green"
                    className="size-6"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                  </svg>
                </button>
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="mx-auto w-full px-2 sm:px-8 lg:px-10 dark:bg-gray-800 dark:text-white">
        {loading ? <p>Loading</p> : displayOrder()}
      </div>
      <ToastUtil />
    </>
  );
};

export default Orders;

import { useEffect, useState } from "react";
import ToastUtil from "../../util/ToastUtil";
import axios from "axios";
import { UseAuthContext } from "../../context/AuthContext";
import OrderModal from "../../util/OrderModal";
import AddItemButton from "../../util/AddItemButton";

const Orders = () => {
  const { toastMessage } = UseAuthContext();
  const [orders, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  //a variable to refresh list after the update has occurred
  const [refreshList, setRefreshList] = useState(false);
  //state for the modal
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [confirmCheckbox, setConfirmCheckbox] = useState({
    orderPaid: false,
    delivered: false,
  });
  const [modal, setModal] = useState(false);

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
        toastMessage("Error fetching Orders", false);
        console.error("Error fetching Orders:", error);
      }
    };

    fetchOrders();
  }, [refreshList]);

  //open confirmation modal and set the deleted Item
  // to be deleted when the user confirms the deletion
  const openModal = (e, item) => {
    //setup the variables for the Modal
    setSelectedOrderId(item._id);
    setOrderList([...item.orderList]);
    setTotalOrder(item.total);
    setCustomerName(item.customerName);
    setConfirmCheckbox({
      ...confirmCheckbox,
      orderPaid: item.paid,
      delivered: item.delivered,
    });
    console.log(item);
    setModal(true);
  };

  //handle the checkbox on the confirm Order Dialog
  //checkbox for the Order Paid and Delivered
  const handleConfirmCheckbox = (event) => {
    console.log(event.target.name, [event.target.name], event.target.value);
    const targetName = event.target.name;
    setConfirmCheckbox({
      ...confirmCheckbox,
      [targetName]: event.target.checked,
    });
  };

  //Confirm the order and save it to the database
  const updateOrderStatus = async () => {
    // construct the final order list
    const finalOrderList = {
      delivered: confirmCheckbox.delivered,
      paid: confirmCheckbox.orderPaid,
    };
    try {
      const res = await axios.put(
        `http://localhost:5000/orders/${selectedOrderId}`,
        {
          ...finalOrderList,
        },
      );
      if (res.status === 200 || res.status === 201) {
        //display toast message
        toastMessage(`Order updated`);
        setSelectedOrderId("");
        //refresh the order list
        setRefreshList(!refreshList);
        //close modal
        setModal(false);
      }
    } catch (err) {
      console.log(err);
      toastMessage(`Error Submitting your Order`);
    }
    console.log(finalOrderList);
    console.log(confirmCheckbox, selectedOrderId);
  };

  //display Orders
  const displayOrder = () => {
    return (
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="w-2/6 px-4 py-2 text-left text-xl font-semibold">
              Customer
            </th>
            <th className="w-1/6 px-4 py-2 text-xl font-semibold">Paid</th>
            <th className="w-1/6 px-4 py-2 text-xl font-semibold">Delivered</th>
            <th className="w-1/6 px-4 py-2 text-xl font-semibold">Total</th>
            <th className="w-1/6 px-4 py-2 text-xl font-semibold">
              Order Date
            </th>
            <th className="w-1/6 px-4 py-2 text-xl font-semibold"></th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
          {orders.map((order, idx) => (
            <tr
              key={order._id || idx}
              className="border-b dark:border-gray-700"
            >
              <td className="px-4 py-2 font-semibold">{order.customerName}</td>
              <td className="px-4 py-2 text-center">
                {!order.paid ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="red"
                    className="mx-auto size-6"
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
                    className="mx-auto size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </td>
              <td className="px-4 py-2 text-center">
                {!order.delivered ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="red"
                    className="mx-auto size-6"
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
                    className="mx-auto size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </td>
              <td className="px-4 py-2 text-center font-semibold">
                {order.total}
              </td>
              <td className="px-4 py-2">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-GB")
                  : ""}
              </td>
              <td className="px-4 py-2 text-center">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="green"
                    className="mx-auto size-6"
                    onClick={(e) => openModal(e, order)}
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      {modal && (
        <OrderModal
          openModal={modal}
          closeModal={() => setModal(false)}
          confirmFunction={() => updateOrderStatus()}
          orderList={orderList}
          totalOrder={totalOrder}
          customerName={customerName}
          handleConfirmCheckbox={handleConfirmCheckbox}
          confirmCheckbox={confirmCheckbox}
        ></OrderModal>
      )}
      <div className="mx-auto w-full px-2 sm:px-8 lg:px-10 dark:bg-gray-800 dark:text-white">
        {loading ? <p>Loading</p> : displayOrder()}
      </div>
      {/* display the toast message*/}
      <ToastUtil />
      {/* display the add button */}
      <AddItemButton linkTo="/placeOrder" title="Place Order" />
    </>
  );
};

export default Orders;

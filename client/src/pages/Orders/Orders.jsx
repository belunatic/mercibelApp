import { useEffect, useState } from "react";
import ToastUtil from "../../util/ToastUtil";
import axios from "axios";
import { UseAuthContext } from "../../context/AuthContext";
import OrderModal from "../../util/OrderModal";
import AddItemButton from "../../util/AddItemButton";
import OrdersTable from "../../components/OrdersTable";

const Orders = () => {
  const { toastMessage } = UseAuthContext();
  const [orders, setOrder] = useState([]);
  //use to display the orderTable Component
  //also refresh the orderTable Component when update occurs
  const [loading, setLoading] = useState(true);
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
  }, [loading]);

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
        //close modal
        setModal(false);
        //this might not be necessary
        //but this is meant to refresh the orders if successive updated
        setLoading(true);
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
    return <OrdersTable orders={orders} openModal={openModal} />;
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

import { useEffect, useState } from "react";
import ToastUtil from "../../util/ToastUtil";
import axios from "axios";
import { UseAuthContext } from "../../context/AuthContext";
import AddItemButton from "../../util/AddItemButton";
import Modal from "../../util/Modal";

import { NavLink } from "react-router-dom";

const Customers = () => {
  const { toastMessage } = UseAuthContext();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios("http://localhost:5000/customers/");
        const data = await res.data;
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        toastMessage("Error fetching Customer", false);
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  //open confirmation modal and set the deleted Item
  // to be deleted when the user confirms the deletion
  const openModal = (e, item) => {
    //prevent the default action of a link from being triggered
    e.preventDefault();
    console.log(item);
    setModal(true);
    setDeletedItem(item);
  };

  const deleteCustomer = async (item) => {
    const { _id, customerName } = item;
    //if no id is found do nothing
    if (!_id) return;
    try {
      const res = await axios.delete(`http://localhost:5000/customers/${_id}`);
      if (res.status === 200 || res.status === 201) {
        //display toast message
        toastMessage(`Customer ${customerName} deleted successfully`);
        setCustomers(customers.filter((item) => item._id !== _id));
        //close modal
        setModal(false);
      }
    } catch (err) {
      toastMessage("Error deleting customer");
      console.log(err);
    }
  };

  const displayCustomers = () => {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {customers.map((customer) => (
          <div
            id={customer._id}
            key={customer.id}
            class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex justify-between">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {customer.customerName}
                </h5>
              </a>
              <div className="flex gap-4">
                <NavLink
                  NavLink
                  to={`/editCustomer/${customer._id}`}
                  className="cursor-pointer text-green-500 hover:text-green-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </NavLink>
                <a
                  onClick={(e) => openModal(e, customer)}
                  className="cursor-pointer text-red-500 hover:text-red-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <p class="mb-3 flex flex-col font-normal text-gray-700 dark:text-gray-400">
              <span className="flex-end flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                {customer.contactName}
              </span>
              <span className="flex-end flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                <a
                  href={`tel:${customer.contactPhone}`}
                  className="text-underline"
                >
                  {customer.contactPhone}
                </a>
              </span>
              <span className="flex-end flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>

                <a href={`mailto:${customer.contactEmail}`}>
                  {customer.contactEmail}
                </a>
              </span>
            </p>
            <a
              href="#"
              class="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                class="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {modal && (
        <Modal
          openModal={modal}
          closeModal={() => setModal(false)}
          confirmFunction={() => deleteCustomer(deletedItem)}
        >
          Are ou sure you want to delete this product?
        </Modal>
      )}
      <div className="mx-auto w-full px-2 sm:px-8 lg:px-10 dark:bg-gray-800 dark:text-white">
        {loading ? "Loading..." : displayCustomers()}
      </div>
      {/* display the toast message */}
      <ToastUtil />
      {/* display the add button */}
      <AddItemButton linkTo="/addCustomer" title="Add Customer" />
    </>
  );
};

export default Customers;

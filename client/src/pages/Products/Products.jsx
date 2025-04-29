import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "../../util/Modal";
import ToastUtil from "../../util/ToastUtil";
import { UseAuthContext } from "../../context/AuthContext";

const Products = () => {
  const { toastMessage } = UseAuthContext();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products/");
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, []);

  //open confirmation modal and set the deleted Item
  // to be deleted when the user confirms the deletion
  const openModal = (item) => {
    console.log(item);
    setModal(true);
    setDeletedItem(item);
  };

  const deleteProduct = async (item) => {
    const { _id, name } = item;
    //if no id is found do nothing
    if (!_id) return;
    try {
      const res = await axios.delete(`http://localhost:5000/products/${_id}`);
      if (res.status === 200 || res.status === 201) {
        //display toast message
        toastMessage(`Product ${name} deleted successfully`);
        setData(data.filter((item) => item._id !== _id));
        //close modal
        setModal(false);
      }
    } catch (err) {
      toastMessage("Error deleting product");
      console.log(err);
    }
  };

  const displayProducts = () => {
    return (
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="inline-block min-w-full p-1.5 align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 dark:bg-gray-800">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="hidden px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-300"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {data.map((item) => (
                    <tr
                      className="hover:bg-gray-100 dark:hover:bg-neutral-700"
                      key={item._id}
                    >
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-neutral-200">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-800 dark:text-neutral-200">
                        {item.price}
                      </td>
                      <td className="hidden px-6 py-4 text-sm whitespace-nowrap text-gray-800 sm:hidden dark:text-neutral-200">
                        {item.description.length > 25
                          ? `${item.description.slice(0, 25)}...`
                          : item.description}
                      </td>
                      <td className="px-6 py-4 text-end text-sm font-medium whitespace-nowrap">
                        <button
                          type="button"
                          className="inline-flex cursor-pointer items-center gap-x-2 rounded-lg border border-transparent pr-2 text-sm font-semibold text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                          onClick={() => openModal(item)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="inline-flex cursor-pointer items-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                          onClick={() => navigate(`/editProduct/${item._id}`)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {modal && (
        <Modal
          openModal={modal}
          closeModal={() => setModal(false)}
          confirmFunction={() => deleteProduct(deletedItem)}
        >
          Are ou sure you want to delete this product?
        </Modal>
      )}
      <div className="mx-auto w-full px-2 sm:px-8 lg:px-10 dark:bg-gray-800 dark:text-white">
        {loading ? "Loading..." : displayProducts()}
      </div>
      <ToastUtil />

      <div class="fixed right-4 bottom-20">
        <NavLink to="/addProduct">
          <button class="cursor-pointer rounded-full bg-green-700 px-2 py-2 font-bold text-white shadow-lg hover:bg-green-600">
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default Products;

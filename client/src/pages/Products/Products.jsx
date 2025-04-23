import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../util/Modal";

const Products = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

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

  const deleteProduct = () => {
    console.log("I got deleted");
    setModal(false);
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
                          onClick={() => setModal(true)}
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
          confirmFunction={deleteProduct}
        >
          Are ou sure you want to delete this product?
        </Modal>
      )}
      <div className="mx-auto w-full px-2 sm:px-8 lg:px-10 dark:bg-gray-800">
        {loading ? "Loading..." : displayProducts()}
      </div>
    </>
  );
};

export default Products;

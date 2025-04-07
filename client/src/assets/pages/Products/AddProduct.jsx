import React, { useState } from "react";
import axios from "axios";
import { UseAuthContext } from "../../../context/AuthContext";

const AddProduct = () => {
  const { loggedInUser } = UseAuthContext();

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(1);
  const [productDesc, setProductDesc] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:5000/products/", {
        name: productName,
        price: productPrice,
        description: productDesc,
        lastUpdatedBy: loggedInUser.id,
        lastUpdateDate: new Date(),
      });

      if (res.status === 200 || res.status === 201) {
        console.log("Hello Again LOL");
        setProductDesc("");
        setProductName("");
        setProductPrice(1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative m-4 sm:m-10">
      <div className="flex items-start justify-between rounded-t border-b p-5">
        <h3 className="text-xl font-semibold">Add Product</h3>
      </div>

      <div className="space-y-6 p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="product-name"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Product Name
              </label>
              <input
                type="text"
                name="product-name"
                id="product-name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="Cassava Flour 25 kg”"
                required
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="3800"
                onChange={(e) => setProductPrice(e.target.value)}
                required
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="product-details"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Product Details
              </label>
              <textarea
                id="product-details"
                rows="6"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                onChange={(e) => setProductDesc(e.target.value)}
                placeholder="Details"
              ></textarea>
            </div>
          </div>
          <div className="rounded-b border-t border-gray-200 py-6">
            <button className="cursor-pointer rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-600 focus:ring-4 focus:ring-cyan-200">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

/* 
form taken from: https://tailwindflex.com/@sophia-baker/form-for-editing-items
*/

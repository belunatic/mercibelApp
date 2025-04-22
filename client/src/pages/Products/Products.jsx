import axios from "axios";
import React, { useState, useEffect } from "react";

const Products = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products/");
        console.log("this is the result", res.data);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, []);

  const displayProducts = () => {
    return (
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="inline-block min-w-full p-1.5 align-middle">
            <div class="overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      class="hidden px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase md:block dark:text-neutral-500"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                  {data.map((item) => (
                    <tr class="hover:bg-gray-100 dark:hover:bg-neutral-700">
                      <td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-neutral-200">
                        {item.name}
                      </td>
                      <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-800 dark:text-neutral-200">
                        {item.price}
                      </td>
                      <td class="hidden px-6 py-4 text-sm whitespace-nowrap text-gray-800 md:block dark:text-neutral-200">
                        {item.description.length > 25
                          ? `${item.description.slice(0, 25)}...`
                          : item.description}
                      </td>
                      <td class="px-6 py-4 text-end text-sm font-medium whitespace-nowrap">
                        <button
                          type="button"
                          class="inline-flex items-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                        >
                          Delete
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
    <div div className="mx-auto w-full px-2 sm:px-8 lg:px-10 dark:bg-gray-800">
      {loading ? "Loading..." : displayProducts()}
    </div>
  );
};

export default Products;

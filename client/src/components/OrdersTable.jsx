import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const OrdersTable = ({ orders, openModal }) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const TOTAL_VALUES_PER_PAGE = 5;

  //set up the initial table display
  useEffect(() => {
    setDataToDisplay(orders.slice(0, TOTAL_VALUES_PER_PAGE));
    console.log(dataToDisplay);
  }, []);

  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };

  const goOnNextPage = () => {
    if (currentPageNumber === orders.length / TOTAL_VALUES_PER_PAGE) return;
    setCurrentPageNumber((prev) => prev + 1);
  };
  const handleSelectChange = (e) => {
    setCurrentPageNumber(e.target.value);
  };

  //next page and prev page useEffect
  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    setDataToDisplay(orders.slice(start, end));
  }, [currentPageNumber]);

  return (
    <div>
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
          {dataToDisplay.map((order, idx) => (
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
      <div id="page-no-dropdown">
        {/*select page to display*/}
        <select
          name="page-number"
          onChange={handleSelectChange}
          value={currentPageNumber}
        >
          {Array.from(Array(orders.length / TOTAL_VALUES_PER_PAGE))
            .map((e, i) => i + 1)
            .map((val) => {
              return <option key={val}>{val}</option>;
            })}
        </select>
      </div>
      {/*next & prev button*/}
      <div id="btn-container">
        <button onClick={goOnPrevPage}>Prev</button>
        <button onClick={goOnNextPage}>Next</button>
      </div>
    </div>
  );
};

OrdersTable.PropTypes = {
  orders: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default OrdersTable;

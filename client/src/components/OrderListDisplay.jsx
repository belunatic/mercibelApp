import PropTypes from "prop-types";

const OrderListDisplay = ({
  orderList,
  handleProductCount,
  handleDeleteProductItem,
  totalOrder,
}) => {
  return (
    <table className="w-full table-auto border-separate border-spacing-y-2.5 py-4 text-left">
      <thead>
        <tr>
          <th colSpan={2}>Items</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {orderList.map((item, index) => (
          <tr key={item._id}>
            <td colSpan={2}>{item.name}</td>
            <td>Tsh {item.price}</td>
            <td className="flex gap-x-2">
              {/* if the function is not pass then this is a modal, so remove the inputs */}
              {handleProductCount ? (
                <>
                  <input
                    type="number"
                    name="productCount"
                    onChange={(e) => handleProductCount(e, index, item)}
                    value={item.count || 0}
                    className="w-[100px] border-1 ps-2"
                  />
                  <a
                    onClick={() => handleDeleteProductItem(item.id)}
                    className="cursor-pointer text-red-500 hover:text-red-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </a>
                </>
              ) : (
                item.count
              )}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="mx-10 border-t-2">
          <td colSpan={3} className="font-bold">
            Total
          </td>
          <td className="border-t-2">Tsh {totalOrder}</td>
        </tr>
      </tfoot>
    </table>
  );
};

OrderListDisplay.propTypes = {
  orderList: PropTypes.array.isRequired,
  handleProductCount: PropTypes.func,
  handleDeleteProductItem: PropTypes.func,
  totalOrder: PropTypes.number.isRequired,
};

export default OrderListDisplay;

import axios from "axios";
import { useState, useEffect } from "react";

const OrderInvoice = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios(
          "http://localhost:5000/orders/invoice/685da92400a8e9f0df40aefc",
        );
        const data = await res.data;
        console.log(res.data);
        setInvoiceData(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInvoice();
  }, []);

  //Display the Item bought
  const displayOrderItem = () => {
    return (
      <div className="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-neutral-700">
        <div className="hidden sm:grid sm:grid-cols-5">
          <div className="text-xs font-medium text-gray-500 uppercase sm:col-span-2 dark:text-neutral-500">
            Item
          </div>
          <div className="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
            Qty
          </div>
          <div className="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
            Rate
          </div>
          <div className="text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
            Amount
          </div>
        </div>

        <div className="hidden border-b border-gray-200 sm:block dark:border-neutral-700"></div>
        {invoiceData.orderList.map((item) => {
          return (
            <div
              className="grid grid-cols-3 gap-2 sm:grid-cols-5"
              key={item.id}
            >
              <div className="col-span-full sm:col-span-2">
                <h5 className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                  Item
                </h5>
                <p className="font-medium text-gray-800 dark:text-neutral-200">
                  {item.name}
                </p>
              </div>
              <div>
                <h5 className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                  Qty
                </h5>
                <p className="text-gray-800 dark:text-neutral-200">
                  {item.count}
                </p>
              </div>
              <div>
                <h5 className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                  Rate
                </h5>
                <p className="text-gray-800 dark:text-neutral-200">
                  {item.price}
                </p>
              </div>
              <div>
                <h5 className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                  Amount
                </h5>
                <p className="text-gray-800 sm:text-end dark:text-neutral-200">
                  {item.count * item.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    // <!-- Invoice -->
    <>
      {" "}
      {loading ? (
        "Fetching Invoice..."
      ) : (
        <div className="mx-auto my-4 max-w-[85rem] px-4 sm:my-10 sm:px-6 lg:px-8">
          <div className="mx-auto sm:w-11/12 lg:w-3/4">
            {/* <!-- Card --> */}
            <div className="flex flex-col rounded-xl bg-white p-4 shadow-md sm:p-10 dark:bg-neutral-800">
              {/* <!-- Grid --> */}
              <div className="flex justify-between">
                <div>
                  <img
                    alt="Mercibel Production Logo"
                    src="/Mercibel_Production_Logo.png"
                    className="size-20 w-auto"
                  />

                  <h1 className="mt-2 text-lg font-semibold text-blue-600 md:text-xl dark:text-white">
                    Mercibel Products
                  </h1>
                </div>
                {/* <!-- Col --> */}

                <div className="text-end">
                  <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl dark:text-neutral-200">
                    Invoice #
                  </h2>
                  <span className="mt-1 block text-gray-500 dark:text-neutral-500">
                    3682303
                  </span>

                  <address className="mt-4 text-gray-800 not-italic dark:text-neutral-200">
                    45 Roker Terrace
                    <br />
                    Latheronwheel
                    <br />
                    KW5 8NW, London
                    <br />
                    United Kingdom
                    <br />
                  </address>
                </div>
                {/* <!-- Col --> */}
              </div>
              {/* <!-- End Grid --> */}

              {/* <!-- Grid --> */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                    Bill to:
                  </h3>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                    Sara Williams
                  </h3>
                  <address className="mt-2 text-gray-500 not-italic dark:text-neutral-500">
                    280 Suzanne Throughway,
                    <br />
                    br/eannabury, OR 45801,
                    <br />
                    United States
                    <br />
                  </address>
                </div>
                {/* <!-- Col --> */}

                <div className="space-y-2 sm:text-end">
                  {/* <!-- Grid --> */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-2">
                    <dl className="grid gap-x-3 sm:grid-cols-5">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        Invoice date:
                      </dt>
                      <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                        {new Date(invoiceData.createdAt).toLocaleDateString(
                          "en-GB",
                        )}
                      </dd>
                    </dl>
                    {/* <dl className="grid gap-x-3 sm:grid-cols-5">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        Due date:
                      </dt>
                      <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                        03/11/2018
                      </dd>
                    </dl> */}
                  </div>
                  {/* <!-- End Grid --> */}
                </div>
                {/* <!-- Col --> */}
              </div>
              {/* <!-- End Grid --> */}

              {/* <!-- Table --> */}
              {displayOrderItem()}
              {/* <!-- End Table --> */}

              {/* <!-- Flex --> */}
              <div className="mt-8 flex sm:justify-end">
                <div className="w-full max-w-2xl space-y-2 sm:text-end">
                  {/* <!-- Grid --> */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-2">
                    {/* <dl className="grid gap-x-3 sm:grid-cols-5 hidden">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        Subtotal:
                      </dt>
                      <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                        $2750.00
                      </dd>
                    </dl> */}

                    <dl className="grid gap-x-3 sm:grid-cols-5">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        Total:
                      </dt>
                      <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                        Tsh {invoiceData.total}
                      </dd>
                    </dl>

                    <dl className="grid gap-x-3 sm:grid-cols-5">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        Tax:
                      </dt>
                      <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                        Tsh {invoiceData.total * 0.18}
                      </dd>
                    </dl>

                    <dl className="grid gap-x-3 sm:grid-cols-5">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        Amount paid:
                      </dt>
                      <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                        Tsh {invoiceData.total + invoiceData.total * 0.18}
                      </dd>
                    </dl>

                    {/* <dl className="grid gap-x-3 sm:grid-cols-5">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        Due balance:
                      </dt>
                      <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                        $0.00
                      </dd>
                    </dl> */}
                  </div>
                  {/* <!-- End Grid --> */}
                </div>
              </div>
              {/* <!-- End Flex --> */}

              <div className="mt-8 sm:mt-12">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  Thank you!
                </h4>
                <p className="text-gray-500 dark:text-neutral-500">
                  If you have any questions concerning this invoice, use the
                  following contact information:
                </p>
                <div className="mt-2">
                  <p className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                    example@site.com
                  </p>
                  <p className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                    +1 (062) 109-9222
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm text-gray-500 dark:text-neutral-500">
                © 2022 Preline.
              </p>
            </div>
            {/* <!-- End Card --> */}

            {/* <!-- Buttons --> */}
            <div className="mt-6 flex justify-end gap-x-3">
              <a
                className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-2xs hover:bg-gray-50 focus:bg-gray-50 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                href="#"
              >
                <svg
                  className="size-4 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Invoice PDF
              </a>
              <a
                className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                href="#"
              >
                <svg
                  className="size-4 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect width="12" height="8" x="6" y="14" />
                </svg>
                Print
              </a>
            </div>
            {/* <!-- End Buttons --> */}
          </div>
          {/* <!-- End Invoice --> */}
        </div>
      )}
    </>
  );
};

export default OrderInvoice;

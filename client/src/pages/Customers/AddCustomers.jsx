import { useState } from "react";

const AddCustomers = () => {
  const [formData, setFormData] = useState({ "customer-type": "Retailer" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const formValues = Object.fromEntries(data.entries());
    console.log("Form Data:", formValues);
    console.log("State Data:", formData);
  };
  return (
    <div className="relative m-4 h-full sm:m-10">
      <div className="flex items-start justify-between rounded-t border-b p-5">
        <h3 className="text-xl font-semibold">Add Customer</h3>
      </div>

      <div className="space-y-6 p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-full">
              <h3 className="border-b border-b-1 py-4 text-xl font-bold">
                Business Details
              </h3>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="customer-name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Customer / Business Name
              </label>
              <input
                type="text"
                name="customer-name"
                id="customer-name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="Shoppers Plaza"
                required
                onChange={handleChange}
                value={formData["customer-name"] || ""}
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="contact-name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Contact Name
              </label>
              <input
                type="text"
                name="contact-name"
                id="contact-name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="John Doe"
                onChange={handleChange}
                value={formData["contact-name"] || ""}
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="contact-phone"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="contact-phone"
                id="contact-phone"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="255 123 456 789"
                required
                onChange={handleChange}
                value={formData["contact-phone"] || ""}
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="contact-email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="contact-email"
                id="contact-email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="abc@xyz.com"
                onChange={handleChange}
                value={formData["contact-email"] || ""}
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="contact-name2"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Contact 2 Name
              </label>
              <input
                type="text"
                name="contact-name2"
                id="contact-name2"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="Sarah Doe"
                onChange={handleChange}
                value={formData["contact-name2"] || ""}
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="contact-phone2"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Contact 2 Phone Number
              </label>
              <input
                type="tel"
                name="contact-phone2"
                id="contact-phone2"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                onChange={handleChange}
                value={formData["contact-phone2"] || ""}
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="contact-email2"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Contact 2 Email
              </label>
              <input
                type="email"
                name="contact-email2"
                id="contact-email2"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                onChange={handleChange}
                value={formData["contact-email2"] || ""}
              />
            </div>
            <div className="col-span-full">
              <h3 className="border-b border-b-1 py-4 text-xl font-bold">
                Customer Info
              </h3>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="customer-address"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                name="customer-address"
                id="customer-address"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="No.22, Kigoma Street, Mbezi Beach"
                required
                onChange={handleChange}
                value={formData["customer-address"] || ""}
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="customer-region"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                State/Region
              </label>
              <input
                type="text"
                name="customer-region"
                id="customer-region"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="Dar es Salaam"
                onChange={handleChange}
                value={formData["customer-region"] || ""}
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="customer-country"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Country
              </label>
              <input
                type="tel"
                name="customer-country"
                id="customer-country"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="Tanzania"
                required
                onChange={handleChange}
                value={formData["customer-country"] || "Tanzania"}
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="customer-type"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Type
              </label>
              <select
                name="customer-type"
                id="customer-type"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                // onChange={(e) => setProductPrice(e.target.value)}
                // value={productPrice}
                required
              >
                <option value="Retailer" checked>
                  Retailer
                </option>
                <option value="Business">Business</option>
                <option value="Wholesaler">Wholesaler</option>
              </select>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="contact-extra"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Notes
              </label>
              <textarea
                id="contact-extra"
                rows="3"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                onChange={handleChange}
                defaultValue={formData["customer-extra"] || ""}
                placeholder="Extra notes about the customer"
                name="contact-extra"
              ></textarea>
            </div>
          </div>
          <div className="flex gap-4 rounded-b py-6">
            <button className="cursor-pointer rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-600 focus:ring-4 focus:ring-cyan-200">
              Create
            </button>
            {/* <button
              className="cursor-pointer rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-600 focus:ring-4 focus:ring-cyan-200"
              onClick={(e) => {
                e.preventDefault();
                navigate("/products");
              }}
            >
              Cancel
            </button> */}
          </div>
        </form>
        {/* <ToastUtil /> */}
      </div>
    </div>
  );
};

export default AddCustomers;

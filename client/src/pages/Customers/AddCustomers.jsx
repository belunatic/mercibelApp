import { useState } from "react";
import axios from "axios";
import { UseAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddCustomers = () => {
  //initate and reset form data after submit
  const initialFormState = {
    customerType: "Retailer",
    customerCountry: "Tanzania",
  };

  const { loggedInUser, toastMessage } = UseAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const addCustomer = async () => {
    try {
      const res = await axios.post("http://localhost:5000/customers/", {
        ...formData,
        lastUpdateBy: loggedInUser.id,
        lastUpdateDate: new Date(),
      });
      if (res.status === 201) {
        console.log(res.data.msg);
        setFormData(initialFormState);
        // //display toast message
        // toastMessage(res.data.msg);
        // setFormData(initialFormState);
        // setTimeout(() => navigate("/customers"), 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    /*alternative way to get form data
    // const form = event.target;
    // const data = new FormData(form);
    // const formValues = Object.fromEntries(data.entries());
    // console.log("Form Data:", formValues);
    */
    console.log("State Data:", formData);
    addCustomer();
  };
  return (
    <div className="relative m-4 h-full sm:m-10">
      <div className="flex items-start justify-between rounded-t border-b p-5">
        <h3 className="text-xl font-semibold">New Customer</h3>
      </div>

      <div className="space-y-6 p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-full">
              <h3 className="py-4 text-xl font-bold">Customer Contacts</h3>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="customerName"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Customer / Business Name
              </label>
              <input
                type="text"
                name="customerName"
                id="customerName"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="Shoppers Plaza"
                required
                onChange={handleChange}
                value={formData["customerName"] || ""}
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="contactName"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Contact Name
              </label>
              <input
                type="text"
                name="contactName"
                id="contactName"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="John Doe"
                onChange={handleChange}
                value={formData["contactName"] || ""}
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
                name="contactPhone"
                id="contactPhone"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="255 123 456 789"
                required
                onChange={handleChange}
                value={formData["contactPhone"] || ""}
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
                name="contactEmail"
                id="contactEmail"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="abc@xyz.com"
                onChange={handleChange}
                value={formData["contactEmail"] || ""}
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="contactName2"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Contact 2 Name
              </label>
              <input
                type="text"
                name="contactName2"
                id="contactName2"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="Sarah Doe"
                onChange={handleChange}
                value={formData["contactName2"] || ""}
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="contactPhone2"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Contact 2 Phone Number
              </label>
              <input
                type="tel"
                name="contactPhone2"
                id="contactPhone2"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                onChange={handleChange}
                value={formData["contactPhone2"] || ""}
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="contactEmail2"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Contact 2 Email
              </label>
              <input
                type="email"
                name="contactEmail2"
                id="contactEmail2"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                onChange={handleChange}
                value={formData["contactEmail2"] || ""}
              />
            </div>
            <div className="col-span-full">
              <h3 className="py-4 text-xl font-bold">Customer Address</h3>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="customerAddress"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                name="customerAddress"
                id="customerAddress"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="No.22, Kigoma Street, Mbezi Beach"
                required
                onChange={handleChange}
                value={formData["customerAddress"] || ""}
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
                name="customerRegion"
                id="customerRegion"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="Dar es Salaam"
                onChange={handleChange}
                value={formData["customerRegion"] || ""}
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="customerCountry"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Country
              </label>
              <input
                type="tel"
                name="customerCountry"
                id="customerCountry"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="Tanzania"
                required
                onChange={handleChange}
                value={formData["customerCountry"] || "Tanzania"}
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="customerType"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Type
              </label>
              <select
                name="customerType"
                id="customerType"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                onChange={handleChange}
                value={formData["customerType"] || "Retailer"}
                required
              >
                <option value="Retailer" checked>
                  Retailer
                </option>
                <option value="Business">Business</option>
                <option value="Wholesaler">Wholesaler</option>
                <option value="Distributor">Distributor</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="contactExtra"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Notes
              </label>
              <textarea
                id="contactExtra"
                rows="3"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                onChange={handleChange}
                defaultValue={formData["customer-extra"] || ""}
                placeholder="Extra notes about the customer"
                name="contactExtra"
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

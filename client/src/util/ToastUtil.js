// ToastUtil.js
import React from "react";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

const ToastUtil = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="light"
      transition={Bounce}
    />
  );
};

export default ToastUtil;

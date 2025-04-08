// ToastUtil.js
import { ToastContainer, Bounce } from "react-toastify";

const ToastUtil = () => {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  );
};

export default ToastUtil;

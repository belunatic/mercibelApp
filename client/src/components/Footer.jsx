import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-gray-200 p-4 text-center dark:bg-gray-700 dark:text-white">
      <div className="container mx-auto text-sm text-gray-600 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Mercibel Production. All rights
          reserved.
        </p>
        <p>Developed by Your Abel SIla</p>
      </div>
    </footer>
  );
};

export default Footer;

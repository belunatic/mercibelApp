import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const AddItem = ({ linkTo }) => {
  return (
    <div class="fixed right-4 bottom-20">
      <NavLink to={linkTo}>
        <button class="cursor-pointer rounded-full bg-green-700 px-2 py-2 font-bold text-white shadow-lg hover:bg-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </NavLink>
    </div>
  );
};

AddItem.propTypes = {
  linkTo: PropTypes.string.isRequired,
};

export default AddItem;

import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const AddItem = ({ linkTo, title }) => {
  return (
    <div class="fixed right-4 bottom-20">
      <NavLink to={linkTo}>
        <button class="group flex cursor-pointer rounded-full bg-green-700 px-3 py-2 font-bold text-white shadow-lg hover:gap-2 hover:bg-green-600">
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
          <span className="collapse h-0 w-0 transition-all duration-0 group-hover:visible group-hover:w-auto">
            {`${title}`}
          </span>
        </button>
      </NavLink>
    </div>
  );
};

AddItem.propTypes = {
  linkTo: PropTypes.string.isRequired,
};

export default AddItem;

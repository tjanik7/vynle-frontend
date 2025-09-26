import React from "react";
import "./css/NavListItem.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function NavListItem({ children, linkTo, isEnabled = true }) {
  if (!isEnabled) {
    return <span className={"hamburger-item-disabled"}>{children}</span>;
  }

  return (
    <Link className={"popup-list-item"} to={linkTo}>
      {children}
    </Link>
  );
}

NavListItem.propTypes = {
  linkTo: PropTypes.string.isRequired,
  uniqueKeyString: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool,
};

export default NavListItem;

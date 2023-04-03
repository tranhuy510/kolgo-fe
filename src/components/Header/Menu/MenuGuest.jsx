import React from "react";
import { NavLink } from "react-router-dom";

const MenuGuest = ({ icons }) => {
  console.log(icons);

  return (
    <ul className="room-guest">
      <li className="icon-room-guest">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          end
        >
          <img src={icons[0]} alt="" />
          <label className="icon-label">Home</label>
        </NavLink>
      </li>
      <li className="icon-room-guest">
        <NavLink
          to="/campaign"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <img src={icons[1]} alt="" />
          <label className="icon-label">Campaign</label>
        </NavLink>
      </li>
    </ul>
  );
};

export default MenuGuest;

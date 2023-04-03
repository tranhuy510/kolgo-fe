import React from "react";
import { NavLink } from "react-router-dom";

const MenuEnterprise = ({ icons }) => {
  return (
    <ul className="room-guest">
      <li className="icon-room-guest">
        <NavLink to="/" className="icon">
          <img src={icons[0]} alt="" />
          <label className="icon-label">Home</label>
        </NavLink>
      </li>
      <li className="icon-room-guest">
        <NavLink to="/campaign" className="icon">
          <img src={icons[1]} alt="" />
          <label className="icon-label">Campaign</label>
        </NavLink>
      </li>
      <li className="icon-room-guest">
        <NavLink to="#" className="icon">
          <img src={icons[2]} alt="" />
          <label className="icon-label">Chat</label>
        </NavLink>
      </li>
    </ul>
  );
};

export default MenuEnterprise;

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const MenuGuest = ({ icons }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <ul className="room-guest">
      <li className="icon-room-guest">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          end
        >
          <img src={icons[0]} alt="" />
          <label className="icon-label">Trang chủ</label>
        </NavLink>
      </li>
      <li className="icon-room-guest">
        <NavLink
          to="/campaign"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <img src={icons[1]} alt="" />
          <label className="icon-label">Chiến dịch</label>
        </NavLink>
      </li>
      {user && (
        <li className="icon-room-guest">
          <NavLink
            to="/chat"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <img src={icons[2]} alt="" />
            <label className="icon-label">Nhắn tin</label>
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default MenuGuest;

import React, { useState, useEffect } from "react";
import { Input, Image, Avatar } from "antd";
import classes from "./SearchModal.module.css";
import { Link } from "react-router-dom";
import { getUsers } from "../../../services/UserService";
import { getKols } from "../../../services/KolService";
import { getEnts } from "../../../services/EnterpriseService";

const { Search } = Input;

const SearchModal = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState([]);
  const [kols, setKols] = useState([]);
  const [ents, setEnts] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    Promise.all([
      getUsers(),
      getKols(),
      getEnts()
    ]).then(([userList, kolList, entList]) => {
      setUsers(userList);
      setKols(kolList);
      setEnts(entList);
    });
  }, [])

  const getKolIdByUserId = (userId) => {
    const kol = kols.find(kol => kol.user.id === userId);
    return kol.id;
  };

  const getEntIdByUserId = (userId) => {
    const ent = ents.find(ent => ent.user.id === userId);
    return ent.id;
  };

  const onChangeInputHandler = (e) => {
    setSearchInput(e.target.value);
    setShow(true);
  };

  const onSearch = (value) => {
    setSearchInput(value);
    setShow(true);
  };

  return (
    <div className={classes["search-modal"]}>
      <Search
        size="large"
        placeholder="input search text"
        onSearch={onSearch}
        onChange={onChangeInputHandler}
        style={{
          width: "100%",
        }}
      />
      {show && (
        <div
          className={classes.backdrop}
          onClick={() => {
            setShow(false);
          }}
        ></div>
      )}
      {show && (
        <div className={classes["result-search"]}>
          {searchInput &&
            users &&
            users.length > 0 &&
            users
              .filter((user) => {
                return searchInput.toLowerCase() === ""
                  ? user
                  : user.firstName
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()) ||
                  user.lastName
                    .toLowerCase()
                    .includes(searchInput.toLowerCase());
              })
              .map((user) => (
                <div key={user.id}>
                  {user.role === "KOL" && (
                    <Link
                      key={user.id}
                      to={`/kols/${getKolIdByUserId(user.id)}`}
                      className={classes["item-search-user"]}
                    >
                      <Avatar size={60} src={user.avatar}>
                        {user?.avatar
                          ? ""
                          : user?.firstName.charAt(0)?.toUpperCase()}
                      </Avatar>
                      <div>
                        <div className={classes["name-item-user"]}>
                          {user.firstName.toLowerCase()} {user.lastName}
                        </div>
                        <div className={classes["role-item-user"]}>kol</div>
                      </div>
                    </Link>
                  )}
                  {user.role === "ENTERPRISE" && (
                    <Link
                      key={user.id}
                      to={`/ents/${getEntIdByUserId(user.id)}`}
                      className={classes["item-search-user"]}
                    >
                      <Avatar size={60} src={user.avatar}>
                        {user?.avatar
                          ? ""
                          : user?.firstName.charAt(0)?.toUpperCase()}
                      </Avatar>
                      <div>
                        <div className={classes["name-item-user"]}>
                          {user.firstName.toLowerCase()} {user.lastName}
                        </div>
                        <div className={classes["role-item-user"]}>
                          Enterprise
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
          {!user &&
            searchInput &&
            kols &&
            kols.length > 0 &&
            kols
              .filter((kol) => {
                return searchInput.toLowerCase() === ""
                  ? kol
                  : kol.firstName
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()) ||
                  kol.lastName
                    .toLowerCase()
                    .includes(searchInput.toLowerCase());
              })
              .map((kol) => (
                <div key={kol.id}>
                  <Link
                    key={kol.id}
                    to={`/kols/${kol.id}`}
                    className={classes["item-search-user"]}
                  >
                    <Avatar size={60} src={kol?.user.avatar}>
                      {kol?.user.avatar
                        ? ""
                        : kol?.user.firstName.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <div>
                      <div className={classes["name-item-user"]}>
                        {kol?.user.firstName.toLowerCase()} {kol.user.lastName}
                      </div>
                      <div className={classes["role-item-user"]}>kol</div>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default SearchModal;

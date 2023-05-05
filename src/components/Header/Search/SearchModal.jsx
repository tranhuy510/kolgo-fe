import React, { useState, useEffect } from "react";
import { Input, Image, Avatar } from "antd";
import classes from "./SearchModal.module.css";
import { Link } from "react-router-dom";
import { getUsers, getKols, getEnts } from "../../../services/getApi";

const { Search } = Input;

const SearchModal = () => {
  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState([]);
  const [kols, setKols] = useState([]);
  const [ents, setEnts] = useState([]);
  const [show, setShow] = useState(false);

  const account = JSON.parse(localStorage.getItem("user"));

<<<<<<< HEAD
    useEffect(() => {
        const identifier = setTimeout(() => {
            getUsers('users', true)
                .then(res => {
                    setUsers(res)
                })
        }, 500)
        return () => {
            clearTimeout(identifier)
        }
    }, [])
=======
  useEffect(() => {
    const identifier = setTimeout(() => {
      getUsers("users", true).then((res) => {
        console.log(res);
        setUsers(res);
      });
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, []);
>>>>>>> 7b09531d078643ab6c8ac29edb4b71553b3a9a90

  useEffect(() => {
    const identifier = setTimeout(() => {
      getKols()
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setKols(data);
        });
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      getEnts()
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setEnts(data);
        });
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, []);

  const getKolId = (userId) => {
    let kolId = null;
    kols.map((kol) => {
      if (kol.userId === userId) {
        kolId = kol.kolId;
      }
    });
    return kolId;
  };

  const getEntId = (userId) => {
    let entId = null;
    ents.map((ent) => {
      if (ent.userId === userId) {
        entId = ent.enterpriseId;
      }
    });
    return entId;
  };

  const onChangeInputHandler = (e) => {
    setSearchInput(e.target.value);
    setShow(true);
    console.log(searchInput);
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
              .filter((item) => {
                return searchInput.toLowerCase() === ""
                  ? item
                  : item.firstName
                      .toLowerCase()
                      .includes(searchInput.toLowerCase()) ||
                      item.lastName
                        .toLowerCase()
                        .includes(searchInput.toLowerCase());
              })
              .map((item) => (
                <div key={item.userId}>
                  {item.roles == "KOL" && (
                    <Link
                      key={item.userId}
                      to={`/detail/kol/:${getKolId(item.userId)}`}
                      className={classes["item-search-user"]}
                    >
                      <Avatar size={60} src={item.avatar}>
                        {item?.avatar
                          ? ""
                          : item?.firstName.charAt(0)?.toUpperCase()}
                      </Avatar>
                      <div>
                        <div className={classes["name-item-user"]}>
                          {item.firstName.toLowerCase()} {item.lastName}
                        </div>
                        <div className={classes["role-item-user"]}>kol</div>
                      </div>
                    </Link>
                  )}
                  {item.roles == "ENTERPRISE" && (
                    <Link
                      key={item.userId}
                      to={`/detail/enterprise/:${getEntId(item.userId)}`}
                      className={classes["item-search-user"]}
                    >
                      <Avatar size={60} src={item.avatar}>
                        {item?.avatar
                          ? ""
                          : item?.firstName.charAt(0)?.toUpperCase()}
                      </Avatar>
                      <div>
                        <div className={classes["name-item-user"]}>
                          {item.firstName.toLowerCase()} {item.lastName}
                        </div>
                        <div className={classes["role-item-user"]}>
                          Enterprise
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
          {!account &&
            searchInput &&
            kols &&
            kols.length > 0 &&
            kols
              .filter((item) => {
                return searchInput.toLowerCase() === ""
                  ? item
                  : item.firstName
                      .toLowerCase()
                      .includes(searchInput.toLowerCase()) ||
                      item.lastName
                        .toLowerCase()
                        .includes(searchInput.toLowerCase());
              })
              .map((item) => (
                <div key={item.kolId}>
                  <Link
                    key={item.kolId}
                    to={`/detail/kol/:${item.kolId}`}
                    className={classes["item-search-user"]}
                  >
                    <Avatar size={60} src={item.avatar}>
                      {item?.avatar
                        ? ""
                        : item?.firstName.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <div>
                      <div className={classes["name-item-user"]}>
                        {item.firstName.toLowerCase()} {item.lastName}
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

import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Input, Image, Avatar } from 'antd';
import classes from './SearchModal.module.css'
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
      console.log(userList);
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
    setSearchInput(e.target.value)
    setShow(true)
    console.log(e.target.value);
  }

  const onSearch = (value) => {
    setSearchInput(value)
    setShow(true)
  }

  let x = window.innerWidth;
  const [windowChange, setWindowChange] = useState({
    widthSearch: 300,
    leftSearch: '150px'
  });

  useLayoutEffect(() => {
    window.addEventListener("resize", function () {
      x = window.innerWidth;
      setTimeout(() => {
        if (x > 1100 && x <= 1359) {
          setWindowChange({
            widthSearch: 300,
            leftSearch: '150px',
          })
        }
        if (x > 800 && x <= 1099) {
          setWindowChange({
            widthSearch: 250,
            leftSearch: '150px',
          })
        }
      }, 500)
    });
  }, [x])

  const filteredUsers = users?.filter((item) => {
    if (item) {
      return searchInput === ""
        ? item
        : item.firstName.toLowerCase().includes(searchInput.toLowerCase()) || item.lastName.toLowerCase().includes(searchInput.toLowerCase())
          ? item
          : null;
    }
  })

  const filteredKols = kols?.filter((item) => {
    if (item) {
      return searchInput === ""
        ? item
        : item.firstName.includes(searchInput) || item.lastName.includes(searchInput)
          ? item
          : null;
    }

  });

  return (
    <div className={classes['search-modal']}
      style={{ left: windowChange.leftSearch, }}
    >
      <Search
        size="large"
        placeholder="input search text"
        onSearch={onSearch}
        onChange={onChangeInputHandler}
        style={{
          width: windowChange.widthSearch,
        }}
      />
      {show && <div className={classes.backdrop} onClick={() => { setShow(false) }}></div>}
      {show && <div className={classes['result-search']} >
        <div className={classes['wrap-result-search']}>
          {/* {user !== null && searchInput &&
            filteredUsers ? (
            filteredUsers?.map((user) => {
              if (user) return (
                <div key={user.userId}>
                  {user.roles == 'KOL' && <Link key={user.userId} to={`/detail/kol/:${getKolIdByUserId(user.userId)}`} className={classes["item-search-user"]}>
                    <Avatar size={40} src={user.avatar}>
                      {user?.avatar ? "" : user?.firstName.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <div>
                      <div className={classes['name-item-user']}>{user.firstName.toLowerCase()} {user.lastName}</div>
                      <div className={classes['role-item-user']}>kol</div>
                    </div>
                  </Link>}
                  {user.roles == "ENTERPRISE" && (
                    <Link key={user.userId} to={`/detail/enterprise/:${getEntIdByUserId(user.userId)}`} className={classes["item-search-user"]}>
                      <Avatar size={40} src={user.avatar}>
                        {user?.avatar ? "" : user?.firstName.charAt(0)?.toUpperCase()}
                      </Avatar>
                      <div>
                        <div className={classes['name-item-user']}>{user.firstName.toLowerCase()} {user.lastName}</div>
                        <div className={classes['role-item-user']}>Enterprise</div>
                      </div>
                    </Link>
                  )}
                </div>
              )
            }
            )) : (user !== null &&
              <div>Không có kết quả tìm kiếm</div>
          )}
          {user === null && searchInput && kols &&
            filteredKols.length ? (
            filteredKols
              .map((kol) => (
                <div key={kol.kolId}>
                  <Link key={kol.kolId} to={`/detail/kol/:${kol.kolId}`} className={classes["item-search-user"]}>
                    <Avatar size={40} src={kol.avatar}>
                      {kol?.avatar ? "" : kol?.firstName.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <div>
                      <div className={classes['name-item-user']}>{kol.firstName.toLowerCase()} {kol.lastName}</div>
                      <div className={classes['role-item-user']}>kol</div>
                    </div>
                  </Link>
                </div>
              ))) : (user === null &&
                <div>Không có kết quả tìm kiếm</div>
          )
          } */}
        </div>

      </div>}
    </div >
  )
}

export default SearchModal

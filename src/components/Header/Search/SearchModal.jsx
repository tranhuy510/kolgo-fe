import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Input, Image, Avatar } from 'antd';
import classes from './SearchModal.module.css'
import { Link } from "react-router-dom";

import { getKols } from "../../../services/KolService";
import { getEnts } from "../../../services/EnterpriseService";

const { Search } = Input;

const SearchModal = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [searchInput, setSearchInput] = useState("");
  const [changeSearch, setChangeSearch] = useState(false);
  const [kols, setKols] = useState([]);
  const [ents, setEnts] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    Promise.all([
      getKols(),
      getEnts()
    ]).then(([kolList, entList]) => {
      setKols(kolList);
      setEnts(entList);
    });
  }, [])

  const onChangeInputHandler = (e) => {
    setSearchInput(e.target.value)
    setShow(true)
    setChangeSearch(true)
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

  const filteredEnts = ents?.filter((ent) => {
    if (ent) {
      return searchInput === ""
        ? ent
        : ent.firstName.includes(searchInput) || ent.lastName.includes(searchInput)
          ? ent
          : null;
    }
  });

  const filteredKols = kols?.filter((kol) => {
    if (kol) {
      return searchInput === ""
        ? kol
        : kol.firstName.includes(searchInput) || kol.lastName.includes(searchInput)
          ? kol
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
          {searchInput && kols &&
            filteredKols.length > 0 && (
              filteredKols
                .map((kol) => (
                  <div key={kol.id}>
                    <Link key={kol.id} to={`kols/${kol.id}`} className={classes["item-search-user"]}>
                      <Avatar size={40} src={kol?.avatar}>
                        {kol?.avatar ? "" : kol?.firstName.charAt(0)?.toUpperCase()}
                      </Avatar>
                      <div>
                        <div className={classes['name-item-user']}>{kol.firstName.toLowerCase()} {kol.lastName}</div>
                        <div className={classes['role-item-user']}>Kol</div>
                      </div>
                    </Link>
                  </div>
                )))
          }
          {user && searchInput && ents &&
            filteredEnts.length > 0 && (
              filteredEnts
                .map((ent) => (
                  <div key={ent.id}>
                    <Link key={ent.id} to={`ents/${ent.id}`} className={classes["item-search-user"]}>
                      <Avatar size={40} src={ent.avatar}>
                        {ent?.avatar ? "" : ent?.firstName.charAt(0)?.toUpperCase()}
                      </Avatar>
                      <div>
                        <div className={classes['name-item-user']}>{ent.firstName.toLowerCase()} {ent.lastName}</div>
                        <div className={classes['role-item-user']}>Enterprise</div>
                      </div>
                    </Link>
                  </div>
                )))
          }
          {changeSearch && filteredKols.length === 0 && <div>Không có kết quả tìm kiếm</div>}
          {changeSearch && !searchInput && <div>Hãy nhập tên cần tìm</div>}
        </div>
      </div>}
    </div >
  )
}

export default SearchModal


import React, { useEffect, useState } from "react";
import classes from '../../Campaign.module.css'
import { listChienDich, listLinhVuc } from "../dataChienDich";
import ItemChienDich from "../ItemChienDich/ItemChienDich";
import { Input } from 'antd';
const { Search } = Input;

const ModalDangDienRa = () => {
    const [chienDich, setChienDich] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    const [searchLinhVuc, setSearchLinhVuc] = useState("");
    const [linhVuc, setLinhVuc] = useState([]);

    useEffect(() => {
        const getPersentData = async () => {
            const chiendichData = await listChienDich;
            setChienDich([...chiendichData]);

            const linhvucData = await listLinhVuc;
            setLinhVuc([...linhvucData]);
        };
        getPersentData();
    }, []);

    const onKeyDownHandler = (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            setInputSearch(event.target.value);
        }
    };

    const checkStringInArrayIgnoreCase = (searchLinhVuc, inputSearch, chienDich) => {
        if (searchLinhVuc !== '' && inputSearch !== '') {
            return chienDich.tenchiendich.toLowerCase().includes(inputSearch.toLowerCase()) && chienDich.linhvuc.map((item) => item.name.toLowerCase()).includes(searchLinhVuc.toLowerCase());
        }
        if (searchLinhVuc !== '') {
            return chienDich.linhvuc.map((item) => item.name.toLowerCase()).includes(searchLinhVuc.toLowerCase());
        }
        if (inputSearch !== '') {
            return chienDich.tenchiendich.toLowerCase().includes(inputSearch.toLowerCase());
        }
    };

    const onChangeHandler = (event) => {
        setSearchLinhVuc(event.target.value);
    };

    const onSearchHandler = (value) => {
        setInputSearch(value);
    }

    const regex = /(.*)\s\((.*)\)/;

    return (
        <div className={classes['campaign-modal-dangDienRa']}>
            <div className={classes["dangDienRa-modal-search"]}>
                <Search
                    size="large"
                    placeholder="Nhập tên chiến dịch"
                    onSearch={onSearchHandler}
                    onKeyDown={onKeyDownHandler}
                    style={{
                        width: 400,
                    }}
                />
                <select
                    className={classes['search-modal-select']}
                    value={searchLinhVuc}
                    onChange={onChangeHandler}
                >
                    {linhVuc &&
                        linhVuc.length > 0 &&
                        linhVuc.map((item) => (
                            <option key={item.id} value={item.name}>
                                {item?.name?.match(regex)[1]}
                            </option>
                        ))}
                </select>
            </div>
            <div className={classes["dangDienRa-modal-listChienDich"]}>
                {chienDich &&
                    chienDich.length > 0 &&
                    chienDich.map((item, index) => (
                        <div className={classes["listChienDich-item"]} key={index}>
                            {searchLinhVuc.toLowerCase() === "" ? (
                                <ItemChienDich data={item} />
                            ) : (
                                checkStringInArrayIgnoreCase(searchLinhVuc, inputSearch, item) && (
                                    <ItemChienDich data={item} />
                                )
                            )}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default ModalDangDienRa
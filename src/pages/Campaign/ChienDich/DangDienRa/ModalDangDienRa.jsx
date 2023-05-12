import React, { useEffect, useState } from "react";
import classes from '../../Campaign.module.css'
import { listChienDich, listLinhVuc } from "../dataChienDich";
import ItemChienDich from "../ItemChienDich/ItemChienDich";
import { Input } from 'antd';
const { Search } = Input;

const ModalDangDienRa = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    const [searchField, setSearchField] = useState("");
    const [fileds, setFileds] = useState([]);

    useEffect(() => {
        const getPersentData = async () => {
            const chiendichData = await listChienDich;
            setCampaigns([...chiendichData]);

            const linhvucData = await listLinhVuc;
            setFileds([...linhvucData]);
        };
        getPersentData();
    }, []);


    const resultSearch = campaigns.filter((cp) => {
        return (inputSearch === "" ? cp : cp.tenchiendich.includes(inputSearch))
            && (searchField === "" ? cp : cp.linhvuc.find(item => item.name === searchField))
    })

    const onKeyDownHandler = (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            setInputSearch(event.target.value);
        }
    };

    const onChangeHandler = (event) => {
        setSearchField(event.target.value);
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
                    value={searchField}
                    onChange={onChangeHandler}
                >
                    {fileds &&
                        fileds.length > 0 &&
                        fileds.map((item) => (
                            <option key={item.id} value={item.name}>
                                {item?.name?.match(regex)[1]}
                            </option>
                        ))}
                </select>
            </div>
            <div className={classes["dangDienRa-modal-listChienDich"]}>
                {resultSearch && resultSearch.length > 0 &&
                    resultSearch.map((campaign, index) => (
                        <div className={classes["listChienDich-item"]} key={index}>
                            <ItemChienDich data={campaign} />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default ModalDangDienRa
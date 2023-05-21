import React, { useContext, useEffect, useState } from 'react'
import CampaignContext from '../../../../context/campaign.context'

import { listChienDich, listLinhVuc } from '../dataChienDich';
import { Skeleton, Input } from 'antd';
import classes from '../../Campaign.module.css';
import ItemCampaign from "../ItemChienDich/ItemCampaign";

const { Search } = Input;

const ModalDangThamGia = () => {
    const userCtx = useContext(CampaignContext);
    const [campaigns, setCampaigns] = useState([])
    const [inputSearch, setInputSearch] = useState("");
    const [searchField, setSearchField] = useState("");
    const [linhVuc, setLinhVuc] = useState(listLinhVuc);

    useEffect(() => {
        if (userCtx.idRole) {
            getCampaigns()
            console.log(userCtx.idRole);
        }
    }, [userCtx.idRole])

    const getCampaigns = () => {
        listChienDich.map((item) => {
            if (userCtx.user.role === 'KOL') {
                item.listKOL.map((kol) => {
                    if (kol.kolId === userCtx.idRole) {
                        setCampaigns(prevCampaigns => [...prevCampaigns, item]);
                    }
                })
            }
            if (userCtx.user.role === 'ENTERPRISE') {
                item.listEnter.map((kol) => {
                    if (kol.enterpriseId === userCtx.idRole) {
                        setCampaigns(prevCampaigns => [...prevCampaigns, item]);
                    }
                })
            }
        })
    }

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
        console.log(resultSearch);
    }

    const regex = /(.*)\s\((.*)\)/;



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

    return (
        <div>
            {!campaigns && (
                <Skeleton active />
            )}
            {campaigns && (
                <div className={classes['campaign-modal-dangThamGia']}>
                    <div className={classes["dangThamGia-modal-search"]}>
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
                            {linhVuc &&
                                linhVuc.length > 0 &&
                                linhVuc.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item?.name?.match(regex)[1]}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className={classes["doing-modal-list-campaign"]}>
                        {resultSearch && resultSearch.length > 0 &&
                            resultSearch.map((campaign, index) => (
                                <div className={classes["listChienDich-item"]} key={index}>
                                    <ItemCampaign data={campaign} />
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ModalDangThamGia
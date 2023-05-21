import React, { useContext, useEffect, useState } from 'react'
import CampaignContext from '../../../../context/campaign.context'

import ItemCampaign from "../ItemChienDich/ItemCampaign";
import { listChienDich, listLinhVuc } from '../dataChienDich';

import { Skeleton, Input, Pagination } from 'antd';
import classes from '../../Campaign.module.css';

const { Search } = Input;

const ModalCampaignIsParticipating = () => {
    const userCtx = useContext(CampaignContext);
    const [campaigns, setCampaigns] = useState([])
    const [inputSearch, setInputSearch] = useState("");
    const [searchField, setSearchField] = useState("");
    const [fields, setFields] = useState(listLinhVuc);

    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(10);

    useEffect(() => {
        if (userCtx.idRole) {
            getCampaigns()
            // console.log(userCtx.idRole);
        }
    }, [userCtx.idRole])

    const onChangePage = (page) => {
        setCurrent(page);
    };

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

    const changeRender = () => {
        if (resultSearch.length > 0) {
            return resultSearch?.slice((current - 1) * 6, (((current - 1) * 6) + 6));
        }
        else return campaigns?.slice((current - 1) * 6, (((current - 1) * 6) + 6));
    }

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
                            <option value="" selected disabled hidden>
                                Lĩnh vực
                            </option>
                            <option value="">Tất cả</option>
                            {fields &&
                                fields.length > 0 &&
                                fields.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item?.name?.match(regex)[1]}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className={classes["doing-modal-list-campaign"]}>
                        {changeRender() && changeRender().length > 0 &&
                            changeRender().map((campaign, index) => (
                                <ItemCampaign data={campaign} />
                            ))}
                    </div>
                    <div className={classes["page-pagination"]}>
                        <Pagination
                            current={current}
                            onChange={onChangePage}
                            total={total}
                            pageSizeOptions={["1", "5", "10"]}
                            pageSize={6}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ModalCampaignIsParticipating
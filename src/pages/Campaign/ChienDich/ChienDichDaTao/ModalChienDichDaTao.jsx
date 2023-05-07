import React, { useEffect, useState, useContext } from 'react'
import ItemChienDich from "../ItemChienDich/ItemChienDich";
import CampaignCreated from './CampaignCreated';

import classes from '../../Campaign.module.css'
import { Input } from 'antd';

import { listChienDich, listLinhVuc } from "../dataChienDich";
import CampaignContext from '../../../../context/campaign.context';

const { Search } = Input;

const ModalChienDichDaTao = () => {
    const userCtx = useContext(CampaignContext);
    const [inputSearch, setInputSearch] = useState("");
    const [searchField, setSearchFields] = useState("");
    const [listFields, setListFields] = useState([]);
    const [campaigns, setCampaign] = useState([]);

    useEffect(() => {
        const getPersentData = async () => {
            const chiendichData = await listChienDich;
            setCampaign([...chiendichData]);

            const linhvucData = await listLinhVuc;
            setListFields([...linhvucData]);
        };
        getPersentData();
    }, []);

    const onSearchHandler = (value) => {
        setInputSearch(value);
    }

    const onKeyDownHandler = (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            setInputSearch(event.target.value);
        }
    };

    const onChangeHandler = (event) => {
        setSearchFields(event.target.value);
    };

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
        <div className={classes['campaign-modal-created']}>
            <div className={classes["created-modal-search"]}>
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
                    {listFields &&
                        listFields.length > 0 &&
                        listFields.map((item) => (
                            <option key={item.id} value={item.name}>
                                {item?.name?.match(regex)[1]}
                            </option>
                        ))}
                </select>
            </div>
            <div className={classes["created-modal-listChienDich"]}>
                {campaigns &&
                    campaigns.length > 0 &&
                    campaigns.map((item, index) => (
                        <div className={classes["listChienDich-item"]} key={index}>
                            {searchField.toLowerCase() === "" ? (
                                userCtx.user.id === item.author.userId && <CampaignCreated data={item} />
                            ) : (
                                checkStringInArrayIgnoreCase(searchField, inputSearch, item) && (
                                    userCtx.user.id === item.author.userId && <CampaignCreated data={item} />
                                )
                            )}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default ModalChienDichDaTao
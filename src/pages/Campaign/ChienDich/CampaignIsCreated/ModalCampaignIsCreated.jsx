import React, { useEffect, useState, useContext } from 'react'
import CampaignCreated from './CampaignCreated';

import classes from '../../Campaign.module.css'
import { Input, Pagination } from 'antd';
import { getEntCampaigns } from "../../../../services/CampaignService";

import CampaignContext from '../../../../context/campaign.context';

const { Search } = Input;

const ModalCampaignIsCreated = () => {
    const ctx = useContext(CampaignContext);

    const [inputSearch, setInputSearch] = useState("");
    const [searchField, setSearchFields] = useState("");

    const [listFields, setListFields] = useState([]);
    const [campaigns, setCampaigns] = useState([]);

    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(10);

    const [campaignDelete, setCampaignDelete] = useState();

    useEffect(() => {
        getEntCampaigns().then((res) => { setCampaigns(res); setTotal(res.length); })
    }, [campaignDelete])

    const onChangePage = (page) => {
        setCurrent(page);
    };

    const listCampaignAfterDelete = campaigns?.filter((cp) => {
        if (campaignDelete) {
            return cp.id !== campaignDelete
        }
    })

    const resultSearch = listCampaignAfterDelete?.filter((cp) => {
        return (inputSearch === "" ? cp : cp.name.includes(inputSearch))
            || (cp.fieldIds?.find(item => item.name === searchField))
    })

    const changeRender = () => {
        if (resultSearch.length > 0) {
            return resultSearch?.slice((current - 1) * 6, (((current - 1) * 6) + 6));
        }
        return campaigns?.slice((current - 1) * 6, (((current - 1) * 6) + 6));
    }


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
                    className={classes['created-modal-select']}
                    value={searchField}
                    onChange={onChangeHandler}
                >
                    <option value="" selected disabled hidden>
                        Lĩnh vực
                    </option>
                    <option value="">Tất cả</option>
                    {listFields &&
                        listFields.length > 0 &&
                        listFields.map((item) => (
                            <option key={item.id} value={item.name}>
                                {item?.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className={classes["created-modal-listChienDich"]}>
                {changeRender() && changeRender().length > 0 &&
                    changeRender().map((campaign, index) => (
                        <div className={classes["listChienDich-item"]} key={campaign.id}>
                            {<CampaignCreated campaign={campaign} setCampaignDelete={setCampaignDelete} />}
                        </div>
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
    )
}

export default ModalCampaignIsCreated
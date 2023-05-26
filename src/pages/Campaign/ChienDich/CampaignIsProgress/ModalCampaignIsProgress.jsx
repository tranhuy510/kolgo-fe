import React, { useEffect, useState, useContext } from "react";

import ItemCampaign from "../ItemChienDich/ItemCampaign";
import CampaignContext from "../../../../context/campaign.context";

import classes from '../../Campaign.module.css'
import { Input, Pagination } from 'antd';
import { getCampaigns, getEntCampaigns } from "../../../../services/CampaignService";

const { Search } = Input;

const ModalCampaignIsProgress = (props) => {
    const ctx = useContext(CampaignContext)

    const [campaigns, setCampaigns] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    const [searchField, setSearchField] = useState("");

    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(10);

    // hàm lấy tất cả chiến dịch đang có
    useEffect(() => {
        getCampaigns().then((res) => { setCampaigns(res); setTotal(res.length); })
    }, [props.isCampaignAdded])

    const onChangePage = (page) => {
        setCurrent(page);
    };

    const resultSearch = campaigns.length > 0 ? campaigns?.map((cp) => {
        return (inputSearch === "" ? cp : cp.name.includes(inputSearch))
            || (cp.fieldIds?.find(item => item.name === searchField))
    }) : []

    const resultSearchField = searchField ? resultSearch?.filter((campaign) => {
        return campaign.fieldNames.includes(searchField)
    }) : resultSearch;

    const changeRender = () => {
        if (resultSearchField.length > 0) {
            return resultSearchField?.slice((current - 1) * 6, (((current - 1) * 6) + 6));
        }
        return campaigns.length > 0 ? campaigns?.slice((current - 1) * 6, (((current - 1) * 6) + 6)) : []
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
        console.log(value);
        setInputSearch(value);
    }

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
                    <option value="" selected disabled hidden>
                        Lĩnh vực
                    </option>
                    <option value="">Tất cả</option>
                    {ctx?.fields &&
                        ctx?.fields.length > 0 &&
                        ctx?.fields.map((field) => (
                            <option key={field?.id} value={field.name}>
                                {field?.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className={classes["doing-modal-list-campaign"]}>
                {changeRender() && changeRender().length > 0 &&
                    changeRender().map((campaign, index) => (
                        <ItemCampaign campaign={campaign} key={campaign?.id} />
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

export default ModalCampaignIsProgress
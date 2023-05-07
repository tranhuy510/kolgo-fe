import React, { useContext, useEffect, useState } from 'react'
import CampaignContext from '../../../../context/campaign.context'
import { getEnts, getKols } from '../../../../services/getApi';
import { listChienDich, listLinhVuc } from '../dataChienDich';
import { Skeleton, Input } from 'antd';
import classes from '../../Campaign.module.css';
import ItemChienDich from '../ItemChienDich/ItemChienDich';
const { Search } = Input;

const ModalDangThamGia = () => {
    const userCtx = useContext(CampaignContext);
    const [user, setUser] = useState({
        id: '',
        role: '',
    })
    const [campaigns, setCampaigns] = useState([])
    const [kols, setKols] = useState([])
    const [ents, setEnts] = useState([])
    const [inputSearch, setInputSearch] = useState("");
    const [searchLinhVuc, setSearchLinhVuc] = useState("");
    const [linhVuc, setLinhVuc] = useState(listLinhVuc);

    useEffect(() => {
        const identifier = setTimeout(() => {
            if (userCtx) {
                if (userCtx.user.role === "KOL") {
                    getKols()
                        .then(res => {
                            return res.json()
                        })
                        .then(data => {
                            setKols(data)
                        })
                }
                if (userCtx.user.role === "ENTERPRISE") {
                    getEnts()
                        .then(res => {
                            return res.json()
                        })
                        .then(data => {
                            setEnts(data)
                        })
                }
            }
        }, 500)
        return () => {
            clearTimeout(identifier)
        }
    }, [])

    useEffect(() => {
        const identifier = setTimeout(() => {
            getIdRole();
        }, 1000)
        return () => {
            clearTimeout(identifier)
        }
    }, [kols, ents])

    useEffect(() => {
        const identifier = setTimeout(() => {
            if (user.id) {
                getCampaigns()
            }
        }, 1000)
        return () => {
            clearTimeout(identifier)
        }
    }, [user])

    const getIdRole = () => {
        if (userCtx.user.role === 'KOL') {
            kols.map((item) => {
                if (item.userId === userCtx.user.id) {
                    setUser({
                        id: item.kolId,
                        role: 'KOL'
                    })
                }
            })
        }
        if (userCtx.user.role === 'ENTERPRISE') {
            ents.map((item) => {
                if (item.userId === userCtx.user.id) {
                    setUser({
                        id: item.enterpriseId,
                        role: 'ENTERPRISE'
                    })
                }
            })
        }
    }

    const getCampaigns = () => {
        listChienDich.map((item) => {
            if (user.role === 'KOL') {
                item.listKOL.map((kol) => {
                    if (kol.kolId === user.id) {
                        setCampaigns(prevCampaigns => [...prevCampaigns, item]);
                    }
                })
            }
            if (user.role === 'ENTERPRISE') {
                item.listEnter.map((kol) => {
                    if (kol.enterpriseId === user.id) {
                        setCampaigns(prevCampaigns => [...prevCampaigns, item]);
                    }
                })
            }
        })
    }

    const onKeyDownHandler = (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            setInputSearch(event.target.value);
        }
    };

    const onChangeHandler = (event) => {
        setSearchLinhVuc(event.target.value);
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
            {!user.id && (
                <Skeleton active />
            )}
            {user.id && (
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
                    <div className={classes["dangThamGia-modal-listChienDich"]}>
                        {campaigns &&
                            campaigns.length > 0 &&
                            campaigns.map((item, index) => (
                                <div className={classes["listChienDich-item"]} key={item.id}>
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
            )}
        </div>
    )
}

export default ModalDangThamGia
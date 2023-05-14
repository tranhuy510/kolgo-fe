import React, { useState, useEffect } from 'react'
import { getKolFields } from '../../../services/FieldService';
import { getCities } from '../../../services/CityService';
import { getKols } from '../../../services/KolService';

import classes from '../content.module.css';
import styled from "styled-components";
import { Input } from 'antd';
import ResultSearch from './ResultSearch';

const Title = styled.h2`
  color: #f0564a;
`;

const ModalSearch = () => {
    const [kolFields, setKolFields] = useState([]);
    const [cities, setCities] = useState([])
    const [kols, setKols] = useState([])

    const [openResult, setOpenResult] = useState(false);

    const [searchField, setSearchField] = useState("");
    const [searchName, setSearchName] = useState("");
    const [searchCity, setSearchCity] = useState("");

    useEffect(() => {
        getKolFields()
            .then((res) => {
                setKolFields(res)
            });

        getCities()
            .then((res) => {
                setCities(res)
            })

        getKols()
            .then((res) => {
                setKols(res)
            })
    }, [])

    const onChangeFieldHandler = (event) => {
        setSearchField(event.target.value);
    };

    const onChangeCityHandler = (event) => {
        setSearchCity(event.target.value);
    };

    const onChangeNameHandler = (event) => {
        setSearchName(event.target.value);
    };

    const regex = /(.*)\s\((.*)\)/;

    const resultKolFlter = kols.filter((kol) => {
        return (searchName === "" ? kol : kol.user.firstName.includes(searchName) || kol.user.lastName.includes(searchName))
            && (searchField === "" ? kol : kol.field.name === searchField)
            && (searchCity === "" ? kol : kol.address.city.name === searchCity)
    })

    const onSearchHandler = () => {
        console.log(searchName);
        console.log(searchField);
        console.log(searchCity);
        console.log(resultKolFlter);
        setOpenResult(true)
    }

    const onResetHandler = () => {
        setSearchField("")
        setSearchName("")
        setSearchCity("")
        setOpenResult(false)
    }

    return (
        <div className={classes['search-container']}>
            <div className={classes['search-filter']}>
                <Input
                    type="text"
                    className={classes['search-filter-name']}
                    value={searchName}
                    placeholder='Nhập tên cần tìm'
                    onChange={onChangeNameHandler}
                />
                <select
                    className={classes['search-filter-field']}
                    onChange={onChangeFieldHandler}
                    value={searchField}
                >
                    <option value="" selected disabled hidden>
                        Lĩnh vực
                    </option>
                    <option value="">Tất cả</option>
                    {kolFields &&
                        kolFields.length > 0 &&
                        kolFields.map((field) => (
                            <option key={field.id} value={field.name}>
                                {field?.name?.match(regex)[1]}
                            </option>
                        ))}
                </select>
                <select
                    className={classes['search-filter-city']}
                    onChange={onChangeCityHandler}
                    value={searchCity}
                >
                    <option value="" selected disabled hidden>
                        Khu vực
                    </option>
                    <option value="">Tất cả</option>
                    {cities &&
                        cities.length > 0 &&
                        cities.map((city) => (
                            <option key={city.id} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                </select>
                <button onClick={onSearchHandler} className={classes['btn-search']}>Tìm kiếm</button>
                <button onClick={onResetHandler} className={classes['btn-renew']}>Làm mới</button>
            </div>
            {openResult && <div className={classes['search-result']}>
                <Title>Kết quả tìm kiếm</Title>
                <ResultSearch resultKolFlter={resultKolFlter} />
            </div>}
        </div>

    )
}

export default ModalSearch
import React from "react";

import "./ChartFilter.css";

const ChartFilter = (props) => {
    const dropdownChangeHandler = (event) => {
        props.onChangeFilter(event.target.value);
    };

    return (
        <div className="activate-filter">
            <div className="activate-filter__control">
                <label>Tìm theo năm</label>
                <select value={props.year} onChange={dropdownChangeHandler}>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                </select>
            </div>
        </div>
    );
};

export default ChartFilter;
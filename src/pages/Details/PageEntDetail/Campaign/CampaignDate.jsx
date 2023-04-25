import React, { useState, useLayoutEffect } from 'react'

const CampaignDate = (props) => {
    const [date, setDate] = useState()

    useLayoutEffect(() => {
        setDate(props.date)
    }, [props.date])

    const year = date?.getFullYear();
    const month = date?.toLocaleString("vn", { month: "long" });
    const day = date?.toLocaleString("en-US", { day: "2-digit" });

    return (
        <div className='date-item'>
            <div className="date-item__day">{day}</div>
            -
            <div className="date-item__month">{month}</div>
            -
            <div className="date-item__year">{year}</div>
        </div>
    )
}

export default CampaignDate
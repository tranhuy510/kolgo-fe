import "./Chart.css";
import React from "react";
import ChartBar from "../ChartBar/ChartBar";

const Chart = (props) => {

    const dataBooks = props.dataBookings.map((bookings) => bookings.books);
    const totalMaximum = Math.max(...dataBooks);

    return (
        <div className="chart">
            {props.dataBookings.map((bookings) => (
                <ChartBar
                    key={bookings.id}
                    books={bookings.books}
                    maxValue={totalMaximum}
                    month={bookings.month}
                    id={bookings.id}
                />
            ))}
        </div>
    );
};

export default Chart;
import React from 'react'
import Chart from '../Chart/Chart';

const ActivateChart = ({ filteredBookings }) => {
    const dataBookings = [
        { idMonth: '1', books: '0', month: '1', id: '1' },
        { idMonth: '2', books: '0', month: '2', id: '2' },
        { idMonth: '3', books: '0', month: '3', id: '3' },
        { idMonth: '4', books: '0', month: '4', id: '4' },
        { idMonth: '5', books: '0', month: '5', id: '5' },
        { idMonth: '6', books: '0', month: '6', id: '6' },
        { idMonth: '7', books: '0', month: '7', id: '7' },
        { idMonth: '8', books: '0', month: '8', id: '8' },
        { idMonth: '9', books: '0', month: '9', id: '9' },
        { idMonth: '10', books: '0', month: '10', id: '10' },
        { idMonth: '11', books: '0', month: '11', id: '11' },
        { idMonth: '12', books: '0', month: '12', id: '12' },
    ]

    const sumBooking = (month) => {
        let count = 0;
        filteredBookings.map((book) => {
            if (book.timestamp.slice(4, 6) === month) count++;
        })
        return count;
    }

    for (let i = 0; i < filteredBookings?.length; i++) {
        const activateMonth = filteredBookings[i].timestamp.slice(4, 6);

        dataBookings[activateMonth - 1].books = sumBooking(activateMonth);
    }

    return <Chart dataBookings={dataBookings} />;
}

export default ActivateChart
import React from 'react'
import Chart from '../Chart/Chart';

const ActivateChart = (props) => {
    const dataBookings = [
        { idMonth: '1', books: '12', month: '1', id: '1' },
        { idMonth: '2', books: '1', month: '2', id: '2' },
        { idMonth: '3', books: '23', month: '3', id: '3' },
        { idMonth: '4', books: '0', month: '4', id: '4' },
        { idMonth: '5', books: '3', month: '5', id: '5' },
        { idMonth: '6', books: '23', month: '6', id: '6' },
        { idMonth: '7', books: '1', month: '7', id: '7' },
        { idMonth: '8', books: '2', month: '8', id: '8' },
        { idMonth: '9', books: '7', month: '9', id: '9' },
        { idMonth: '10', books: '5', month: '10', id: '10' },
        { idMonth: '11', books: '6', month: '11', id: '11' },
        { idMonth: '12', books: '9', month: '12', id: '12' },
    ]

    for (let i = 0; i < props.filteredBookings.length; i++) {
        const activateMonth = props.filteredBookings[i].date.getMonth();
        console.log(
            (dataBookings[activateMonth - 1].books += props.filteredBookings[i].books)
        );
        dataBookings[activateMonth - 1].books += props.filteredBookings[i].books;
    }

    return <Chart dataBookings={dataBookings} />;
}

export default ActivateChart
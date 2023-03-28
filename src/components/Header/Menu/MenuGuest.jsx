import React from 'react'

const MenuGuest = ({ icons }) => {
    console.log(icons);

    return (
        <div className="room-guest">
            <div className="icon-room-guest">
                <a href="#" className="icon-home">
                    <img src={icons[0]} alt="" />
                    <label className="icon-label">Home</label>
                </a>
            </div>
            <div className="icon-room-guest">
                <a href="#" className="icon-campaign">
                    <img src={icons[1]} alt="" />
                    <label className="icon-label">Campaign</label>
                </a>
            </div>
        </div>
    )
}

export default MenuGuest
import React from 'react'

const MenuKOL = ({ icons }) => {
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
            <div className="icon-room-guest">
                <a href="#" className="icon-campaign">
                    <img src={icons[2]} alt="" />
                    <label className="icon-label">Chat</label>
                </a>
            </div>
        </div>
    )
}

export default MenuKOL
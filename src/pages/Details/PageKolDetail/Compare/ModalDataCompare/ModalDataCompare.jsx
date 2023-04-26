import React from 'react'

import TiktokIcon from "../../../../../assets/icon/icon-tiktok.png";
import FacebookIcon from "../../../../../assets/icon/icon-facebook.png";
import IntagramIcon from "../../../../../assets/icon/icon-intagram.png";

const ModalDataCompare = (props) => {
    return (
        <>
            <div className="compare-interact">
                <img
                    className="comparisonType-image"
                    src={FacebookIcon}
                    alt="icon-tiktok"
                />
                <div>{props.dataUser1 && props.dataUser1.faceBook}</div>
                <div>{props.dataUser2 && props.dataUser2.faceBook}</div>
            </div>
            <div className="compare-interact">
                <img
                    className="comparisonType-image"
                    src={IntagramIcon}
                    alt="icon-tiktok"
                />
                <div>{props.dataUser1 && props.dataUser1.intagram}</div>
                <div>{props.dataUser2 && props.dataUser2.intagram}</div>
            </div>
            <div className="compare-interact">
                <img
                    className="comparisonType-image"
                    src={TiktokIcon}
                    alt="icon-tiktok"
                />
                <div>{props.dataUser1 && props.dataUser1.tiktok}</div>
                <div>{props.dataUser2 && props.dataUser2.tiktok}</div>
            </div>
            <div className="compare-interact">
                <span className="comparisonType-text">Số lượng book hàng tháng</span>
                <div>{props.dataUser1 && props.dataUser1.quantityMonth}</div>
                <div>{props.dataUser2 && props.dataUser2.quantityMonth}</div>
            </div>
        </>
    )
}

export default ModalDataCompare
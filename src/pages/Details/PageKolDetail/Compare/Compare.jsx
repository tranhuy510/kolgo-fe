import "./Compare.css";
import { useEffect, useState, lazy } from "react";

import { getSocialLinksSearch, getKols } from "../../../../services/getApi";
import ModalSearch from "./ModalSearch/ModalSearch";
import ContainerAvatar from "./ContainerAvatar/ContainerAvatar";
import ModalDataCompare from "./ModalDataCompare/ModalDataCompare";

const Compare = (props) => {

    const [dataUser2, setDataUser2] = useState({});
    const [open, setOpen] = useState(false);
    const [kols, setKols] = useState([])

    useEffect(() => {
        getKols()
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res)
                }
                return res.json();
            })
            .then(data => {
                setKols(data);
            }).catch(function (error) {
                console.error(error);
            });
    }, [])

    // useEffect(() => {
    //     getSocialLinksSearch()
    //         .then(res => {
    //             return res.json();
    //         })
    //         .then(data => {
    //             console.log(data);
    //         })
    // }, [])

    const showModal = () => {
        setOpen(true);
    };
    const cancelShowHandler = () => {
        setOpen(false);
    };
    const chooseUserCompare = (data) => {
        setDataUser2(data);
        cancelShowHandler();
    };
    console.log(props.infoKol);

    return (
        <div className="form-so-sanh">
            <div className="compare-avatar">
                <div className="container-avatar">
                    <ContainerAvatar user={props.infoKol} />
                </div>
                <div className="image image-center"></div>
                <div className="container-avatar">
                    {dataUser2.userId && <ContainerAvatar user={dataUser2} />}
                    <div
                        className={dataUser2.userId ? "hide-more-user" : "more-user-compare"}
                        onClick={showModal}
                        style={{
                            backgroundImage: `url(https://banner2.cleanpng.com/20180315/qae/kisspng-computer-icons-plus-sign-clip-art-plus-sign-5aaad899307aa1.3479178215211460091986.jpg)`,
                        }}
                    ></div>
                </div>
            </div>
            <ModalSearch open={open} cancelShowHandler={cancelShowHandler} kols={kols} chooseUserCompare={chooseUserCompare} />
            <ModalDataCompare dataUser1={props.infoKol} dataUser2={dataUser2} />
        </div>
    );
};
export default Compare;

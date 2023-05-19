import React, { useState, useEffect, useLayoutEffect } from 'react'
import { getKolFields } from '../../services/FieldService';
import { Link } from "react-router-dom";
import classes from './Sidebar.module.css'

const SideBar = () => {

    const [fields, setFields] = useState([])

    useEffect(() => {
        getKolFields().then(res => {
            setFields(res)
        });
    }, [])

    const regex = /(.*)\s\((.*)\)/;

    let windowHeight = window.innerHeight;
    const [windowChange, setWindowChange] = useState({
        height: '600px',
    });

    useLayoutEffect(() => {
        window.addEventListener("resize", function () {
            windowHeight = window.innerHeight
            if (windowHeight > 700) {
                setWindowChange({ height: '700px' })
            }
            if (windowHeight <= 599) {
                setWindowChange({ height: `${windowHeight - 60}px` })
            }
        });
    }, [windowHeight])

    return (
        <div className={classes["sidebar"]} style={{ height: windowChange.height }}>
            <div className={classes['item-sidebar']} >
                <p style={{ textAlign: 'center', fontWeight: '500', fontSize: '20px' }}>Lĩnh vực</p>
                {
                    fields?.map((field) => {
                        const name = field?.name?.match(regex)[1]
                        return (
                            <div className={classes["box-item"]}>
                                <Link to={`/field/${field.id}`} key={field.id}>
                                    <p className={classes["item-p"]}>{name}</p>
                                    {/* <FontAwesomeIcon icon="fa-regular fa-pot-food" /> */}
                                </Link>
                            </div>

                        )
                    })
                }
            </div>
        </div >
    )
}

export default SideBar;
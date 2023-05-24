import React, { useEffect } from 'react'
import { Image } from 'antd';
import { useState } from 'react';
import SimpleSlider from "../SimpleSlider/SimpleSlider";
import classes from './ImageDescription.module.css'

const ImageDescription = ({ images, avatar }) => {
    const [imageShow, setImageShow] = useState("")

    useEffect(() => {
        setImageShow(avatar)
    }, [avatar])


    const onChangeImageHandler = (img) => {
        setImageShow(img)
    }
    return (
        <>
            <div className={classes['image-show']}>
                <Image className={classes.image} src={`http://localhost:8080/api/images/${imageShow}`} width={340} />
            </div>
            <div className={classes["slider-image"]}>
                <SimpleSlider images={images} onChangeImageHandler={onChangeImageHandler} />
            </div>
        </>
    )
}

export default ImageDescription
import React from 'react'
import { Image } from 'antd';
import { useState } from 'react';
import SimpleSlider from "../SimpleSlider/SimpleSlider";
import classes from './ImageDescription.module.css'

const ImageDescription = ({ images }) => {
    images = ['https://playerduo.com/api/upload-service/thumbs/medium/44e0b45a-55c1-4138-b4be-6fc5857467ee__a2d6dae0-d5b5-11ed-a19f-23a3b10d190e__player_album.jpg',
        'https://playerduo.com/api/upload-service/thumbs/medium/44e0b45a-55c1-4138-b4be-6fc5857467ee__235d9a40-d481-11ed-a19f-23a3b10d190e__player_album.jpg',
        'https://playerduo.com/api/upload-service/thumbs/medium/44e0b45a-55c1-4138-b4be-6fc5857467ee__1bd31230-d352-11ed-a19f-23a3b10d190e__player_album.jpg',
        'https://playerduo.com/api/upload-service/images/44e0b45a-55c1-4138-b4be-6fc5857467ee__d6e1e330-9b8f-11ed-a19f-23a3b10d190e__player_album.jpg',
        'https://playerduo.com/api/upload-service/images/44e0b45a-55c1-4138-b4be-6fc5857467ee__d6e1e330-9b8f-11ed-a19f-23a3b10d190e__player_album.jpg',
    ]

    const [imageShow, setImageShow] = useState(images[0])

    const onChangeImageHandler = (data) => {
        console.log(data);
        setImageShow(data)
    }
    return (
        <>
            <div className={classes['image-show']}>
                <Image className={classes.image} src={imageShow} width={340} />
            </div>
            <div className={classes["slider-image"]}>
                <SimpleSlider images={images} onChangeImageHandler={onChangeImageHandler} />
            </div>
        </>
    )
}

export default ImageDescription
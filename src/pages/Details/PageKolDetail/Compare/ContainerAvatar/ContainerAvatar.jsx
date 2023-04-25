import React from 'react'

const ContainerAvatar = (props) => {
    return (
        <>
            <div
                className="image image-left"
                style={{
                    backgroundImage: `url(${props.user?.avatar ? props.user.avatar : ''})`,
                }}
            ></div>
            <div style={{ textAlign: 'center', fontSize: '18px' }}>{props.user?.firstName} {props.user?.lastName}</div>
        </>
    )
}

export default ContainerAvatar
import React from 'react'

const ContainerAvatar = (props) => {
    console.log(props.user);
    return (
        <>
            <img
                className="image image-left"
                src={`http://localhost:8080/api/images/${props.user?.avatar}`}
            ></img>
            <div style={{ textAlign: 'center', fontSize: '18px' }}>{props.user?.firstName} {props.user?.lastName}</div>
        </>
    )
}

export default ContainerAvatar
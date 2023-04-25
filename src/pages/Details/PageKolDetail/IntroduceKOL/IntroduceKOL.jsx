import React from 'react'

const IntroduceKOL = (props) => {
    return (
        <div>
            <h1 style={{ opacity: '0.8' }}>Giới thiệu</h1>
            <span style={{ whiteSpace: 'pre-wrap', lineHeight: '40px', fontSize: '20px', opacity: '0.8' }}>{props.description}</span>
        </div>
    )
}

export default IntroduceKOL
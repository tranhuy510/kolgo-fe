import React, { useState } from 'react'

const SubContext = (props) => {
    const [key, setKey] = useState(props.changeContent);

    if (key !== props.changeContent) {
        setKey(props.changeContent)
    }

    const components = [
        <div>Option 1</div>,
        <div>Option 2</div>,
        <div>Option 3</div>,
        <div>Option 4</div>,
        <div>Option 5</div>,
        <div>Option 6</div>,
        <div>Option 7</div>,
        <div>Option 8</div>,
        <div>Option 9</div>,
        <div>Option 10</div>,
        <div>Option 11</div>,
        <div>Option 12</div>,
        <div>Option 13</div>,
    ]

    return (
        <div className='sub-context' style={{ width: '100%' }}>
            {components.map((component, index) => {
                if (index == key) {
                    return component
                }
            })}
        </div>
    )
}

export default SubContext
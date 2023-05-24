import React from 'react'

const IntroduceKOL = (props) => {
    return (
        <div>
            <h1 style={{ opacity: '0.8' }}>Giới thiệu</h1>
            <span style={{ fontSize: '20px', opacity: '0.8', whiteSpace: 'pre-wrap', }}>
                <FormatText details={props.description} />
            </span>
        </div>
    )
}

const FormatText = (props) => {
    const formattedText = props.details?.replace(/\\n/g, '\n').split('\n').map((line, index) => {
        return (
            <React.Fragment key={index}>
                {line}
                <br /><br />
            </React.Fragment>
        );
    });
    return <div style={{ marginTop: '20px' }}>{formattedText}</div>;
};

export default IntroduceKOL
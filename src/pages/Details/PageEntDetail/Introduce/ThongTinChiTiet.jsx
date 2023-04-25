import React from 'react'

const ThongTinChiTiet = () => {
    const description = `For nearly three decades, mgm technology partners has been taking long-term responsibility for developing highly scalable, integrated, and secure online applications for business-critical software systems of market-leading e-commerce companies, insurance clients, and public sector institutions.\n
Currently, with more than 950 employees and 19 locations in Europe and Asia, we are among the leading software houses for java based application systems. Our work is further enhanced by our subsidiary mgm consulting partners and mgm security partners.\n
mgm Research & Development identified the best innovations in our software projects and based on these developed a low-code platform (A12) for online applications available to all mgm projects as well as customers and partners. A12 allows our customers to profit from the gains in efficiency and the easy adaptations when developing online applications.\n
mgm lives the mission:
Innovation Implemented.
    `

    return (
        <div>
            <h2>Giới thiệu về mgm technology partners Vietnam</h2>
            <span style={{ whiteSpace: 'pre-wrap', fontSize: '20px', opacity: '0.8' }}>{description}</span>
        </div>
    )
}

export default ThongTinChiTiet
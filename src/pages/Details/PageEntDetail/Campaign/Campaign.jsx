import React from 'react'
import CampaignDate from './CampaignDate'

import classes from '../PageEntDetail.module.css'

const datas = [
    { id: 1, name: 'da cap number 1', content: "ko ma nao chiu thua ma nao", enterprises: ['cty ABC', 'cty XYZ'], kols: ['abc', 'xyz'], date: new Date(2022, 5, 12) },
    { id: 2, name: 'da cap number 1', content: "ko ma nao chiu thua ma nao", enterprises: ['cty ABC', 'cty XYZ'], kols: ['abc', 'xyz'], date: new Date(2022, 5, 12) },
    { id: 3, name: 'da cap number 1', content: "ko ma nao chiu thua ma nao", enterprises: ['cty ABC', 'cty XYZ'], kols: ['abc', 'xyz'], date: new Date(2022, 5, 12) },
]

const Campaign = () => {
    return (
        <div className={classes['enterprise-detail-container']}>
            <div className={classes['enterprise-detail-campaign']}>
                {datas.map((data) => {
                    return (
                        <div className={classes['campaign-wrap-item']}>
                            <div key={data.id} className={classes['campaign-item']}>
                                <div className={classes['campaign-item-header']}>
                                    <h2>{data.name}</h2>
                                    <CampaignDate date={data.date} />
                                </div>

                                <div>{data.content}</div>
                            </div>
                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default Campaign
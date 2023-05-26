import React, { useContext } from 'react'
import CampaignContext from '../../context/campaign.context';
import classes from './Campaign.module.css'
import { Menu } from 'antd';

const SubMenu = (props) => {
    const userCtx = useContext(CampaignContext);

    function getItem(label, key, icon, role, children, type) {
        if (!userCtx.user) {
            if (role === 'both' && key === '0') {
                return {
                    key,
                    icon,
                    children,
                    label,
                    type,
                };
            }
        }
        if (userCtx.user) {
            if (role === userCtx.user.role || role === 'both') {
                return {
                    key,
                    icon,
                    children,
                    label,
                    type,
                };
            }
        }
    }

    const items = [
        getItem('Chiến dịch', '0', null, 'both'),
        getItem('Chiến dịch đang tham gia', '1', null, 'KOL'),
        getItem('Tạo chiến dịch', '2', null, 'ENTERPRISE'),
        getItem('Chiến dịch đã tạo', '3', null, 'ENTERPRISE'),
        getItem('Combo', '4', null, 'both'),
        getItem('Combo đang tham gia', '5', null, 'both'),
    ]

    const onClick = (e) => {
        props.onChangeTabHandler(e.key)
    };

    return (
        <Menu
            onClick={onClick}
            style={{
                width: '100%',
                fontSize: '20px'
            }}
            defaultSelectedKeys={['0']}
            // defaultOpenKeys={['chiendich']}
            mode="inline"
            items={items}
            className={classes['menu-campaign']}
        />
    )
}

export default SubMenu
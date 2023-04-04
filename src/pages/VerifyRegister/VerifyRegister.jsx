import React, { useEffect, useState } from 'react'
import { verify } from '../../services/authentication';
import Success from './Success';
import Warning from './Warning';

const VerifyRegister = () => {
    const [showSuccess, setShowSuccess] = useState(false)
    const [showWarning, setShowWarning] = useState(false)


    const message = '';
    useEffect(() => {
        verify(window.location.search).then(res => {
            if (res.ok) {
                setShowSuccess(true)
                return res.json()
            }
            if (!res.ok) { setShowWarning(true) }
            return Promise.reject(res)
        }).then(data => {
            message = data;
        }).catch(err => {
            err.json().then(e => console.log(e))
        });

        console.log(window.location.search);
    }, [])

    return (
        <div>
            {showSuccess && <Success />}
            {showWarning && <Warning />}
        </div>
    )
}

export default VerifyRegister
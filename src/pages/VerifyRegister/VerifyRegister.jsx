import React, { useEffect, useState, useLayoutEffect } from 'react'
import { verify } from '../../services/authentication';
import Success from './Success';
import Warning from './Warning';

const VerifyRegister = () => {
    const [showSuccess, setShowSuccess] = useState(false)
    const [showWarning, setShowWarning] = useState(false)

    useLayoutEffect(() => {
        const controller = new AbortController()

        verify(window.location.search).then(res => {
            console.log(res.json());

            if (res.ok) {
                setShowSuccess(true)
                return res.json()
            }
            if (!res.ok) {
                setShowWarning(true)
                return Promise.reject(res)
            }

        }).catch(err => {
            err.json().then(e => console.log(e))
        });

        return () => {
            controller.abort()
        }
    }, [])
    console.log(showSuccess, showWarning);

    return (
        <div>
            {showSuccess && <Success />}
            {showWarning && !showSuccess && <Warning />}
        </div>
    )
}

export default VerifyRegister
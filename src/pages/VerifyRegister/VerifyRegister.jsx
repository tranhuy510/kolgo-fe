import React, { useEffect, useState } from 'react'
import { verify } from '../../services/authentication';
import Success from './Success';
import Warning from './Warning';

const VerifyRegister = () => {
    const [showSuccess, setShowSuccess] = useState(false)
    const [showWarning, setShowWarning] = useState(false)
    const [verifyToken, setVerifyToken] = useState('')

    // cach 1
    // const fetchData = async () => {
    //     try {
    //         const res = await verify(window.location.search);
    //         console.log(res.json());
    //         if (res.ok) {
    //             setShowSuccess(true);
    //         } else {
    //             setShowWarning(true);
    //         }
    //         return res;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // const useEffectOnlyOnce = (func) => useEffect(func, [])
    // useEffectOnlyOnce(fetchData())

    // cach 2
    useEffect(() => {
        setVerifyToken(window.location.search)
        verify(window.location.search).then(res => {
            if (res.ok) {
                setShowSuccess(true);
                console.log('fetch thanh cong');
            }
            else {
                setShowWarning(true);
            }
        })
    }, [verifyToken])

    console.log(showSuccess, showWarning);

    return (
        <div>
            {showSuccess && <Success />}
            {showWarning && !showSuccess && <Warning />}
        </div>
    )
}

export default VerifyRegister
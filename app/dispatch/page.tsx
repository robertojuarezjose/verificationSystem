'use client'
import React, {useEffect} from 'react';
import {redirect} from "next/navigation";

function DispatchPage() {

    useEffect(() => {
        redirect('/dispatch/qrCodeVerification');
    }, []);
    return (
        <div>Dispatch Page</div>
    );
}

export default DispatchPage;
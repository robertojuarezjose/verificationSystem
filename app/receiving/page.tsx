'use client'
import React, {useEffect} from 'react';
import {redirect} from "next/navigation";

function ReceivingPage() {

    useEffect(() => {
        redirect('/receiving/qrGenerator');
    }, []);


    return (
        <div className='flex justify-center items-center'>ReceivingPage</div>
    );
}

export default ReceivingPage;
'use client'
import React, {useEffect} from 'react';
import {redirect} from "next/navigation";
function YardPage() {



    useEffect(() => {
        redirect('/yard/monitor');
    }, []);

    return (
        <div>Yard Page</div>
    );
}

export default YardPage;
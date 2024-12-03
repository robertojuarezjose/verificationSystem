import React from 'react';

type UtcToLocalTimeProps = {
    date: Date;
}


function UtcToLocalTime({date}: UtcToLocalTimeProps ) {

    const fixedDate =  new Date(
        Date.parse(date.toUTCString())
    )


    return (
        <>
            {fixedDate.toLocaleDateString() + " " + fixedDate.toLocaleTimeString()}
        </>
    );
}

export default UtcToLocalTime;
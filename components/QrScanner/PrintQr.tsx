import {ReactNode, } from "react";
import {  forwardRef } from 'react';



interface Props {
    children: ReactNode;
}



const QrPrint = forwardRef<HTMLDivElement | null, Props>(({children}, ref) => {
    return (
        <div ref={ref}>
            <div >
                {children}
            </div>

        </div>
    );
});


QrPrint.displayName = "QrPrint";

export default QrPrint;
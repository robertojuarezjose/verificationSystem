'use client'

import {useEffect, useState} from "react";
import  {QRCode} from 'jsqr';
import {Card} from '@/components/ui/card'
import {Button} from "@/components/ui/button";
import QRScanner from "@/components/QrScanner/QRScanner";
import CompareQRs from "@/components/QrScanner/CompareQRs";
import { IoCamera } from "react-icons/io5";


const QrCodeVerification  = () => {
    const [qrCode, setQrCode] =  useState<string |QRCode>("");
    const [qrCode2, setQrCode2] =  useState<string |QRCode>("");
    const [startScanning, setStartScanning] = useState(false);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState<string>("");
    let buttonText = "Start Scanning";






    function updateStateQr1(code: string | QRCode){


        if(code){
            setQrCode(code);
        }
        console.log("code: success function 1");


    }

    function updateStateQr2(code: string | QRCode){


        if(code){

            setQrCode2(code);
        }
        console.log("code: success function 2");

    }



    if(startScanning && !qrCode && !qrCode2 ){
        buttonText = "Stop Scanning";

    }else{

        buttonText = "Start Scanning";
    }


    if(qrCode && qrCode2 && startScanning) {

        if(qrCode && qrCode2 && startScanning){
            buttonText = "Clear Qr Scans";
        }
    }



    function onClickScanButton() {

        if(!startScanning){
            setQrCode("");
            setQrCode2("");
            buttonText = "Start Scanning";
        }
        setStartScanning(!startScanning);




    }






    useEffect(() => {

       if(startScanning){
           setLoading(true);
       }else{
           setLoading(false);
       }

        const timeoutId = setTimeout(() => {


            setLoading(false);
        }, 3000);

        return () =>clearTimeout(timeoutId);

    },[startScanning])



//w-96 h-96
    return (
        <section className="flex flex-col lg:flex-row w-full h-full  sm:items-center justify-between ">

            <div className="w-96 h-96 flex  items-center justify-between rounded-2xl border-double border-4 border-gray-300 bg-gray-200" >

                {!startScanning &&<div className='flex mx-auto'><IoCamera className="text-6xl text-gray-500"/></div> }

                {loading && <div className='flex mx-auto text-black'><h2>Opening camera...</h2></div>}
                {!loading && (startScanning &&  !qrCode)&& <QRScanner updateState={updateStateQr1}  />}

                {!loading && (startScanning && qrCode && !qrCode2) && <QRScanner updateState={updateStateQr2}  updateUrlState={setUrl}  />}

                {qrCode && qrCode2 && startScanning && <CompareQRs qrCode1={qrCode} qrCode2={qrCode2} qrUrl={url}/>}

            </div>


            <div className=" flex lg:h-full w-full items-center lg:items-start lg:w-96 flex-col bg">

                <div className='mt-5 lg:mt-0 ' >
                    <Button className="bg-orange-500 hover:bg-orange-200 mb-4" onClick={onClickScanButton}>{buttonText}</Button>

                </div>
                {qrCode && startScanning && <Card className='bg-green-500 px-14 transition duration-1000 ease-in-out'>Qr code 1 successfully scanned</Card>}

                {qrCode2 && startScanning && <Card className='bg-green-500 mt-5 px-14 transition duration-1000 ease-in-out' > Qr code 2 successfully scanned </Card>}

            </div>



        </section>
    );
}

export default QrCodeVerification;
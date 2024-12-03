

import React, {useEffect} from 'react';
import {QRCode} from "jsqr";
import {Card} from "@/components/ui/card";
import {deleteFromYardByQrUrl} from "@/utils/actions";
import {useToast} from "@/hooks/use-toast";

type CompareQrsProps = {

    qrCode1: string | QRCode;
    qrCode2: string | QRCode;
    qrUrl: string;
}

function CompareQRs({qrCode1, qrCode2, qrUrl}: CompareQrsProps) {

    const { toast } = useToast();
    let compareMessage = "QR codes are not the same";

    console.log(`qrCode1: ${qrCode1} \n qrCode2: ${qrCode2.toString()}`);

    if(qrCode1.toString() == qrCode2.toString()){
        compareMessage = "QR codes are the same";
    }

    useEffect(() => {

        if (qrCode1.toString() == qrCode2.toString()) {


            const updateYard = async () =>{
                const data = await deleteFromYardByQrUrl(qrUrl);
                if (data.message == 'success') {


                    let index1 = qrUrl.indexOf("=");
                    let index2 = qrUrl.indexOf("&");
                    const truckNumber = qrUrl.slice(index1 + 1, index2);
                    let cargoBoxNumber = qrUrl.slice(index2 + 1, qrUrl.length);
                    index1 = cargoBoxNumber.indexOf("=");
                    index2 = cargoBoxNumber.indexOf("&");
                    cargoBoxNumber = cargoBoxNumber.slice(index1 + 1, index2);

                    sessionStorage.removeItem('qrUrl');
                    toast({ description: `Success: Truck with plates ${truckNumber} and cargo box #${cargoBoxNumber} can now be dispatched` });
                }
            }

            updateYard();



        }

    }, [qrUrl]);





    return (
        <div className='flex mx-auto'>
            <Card className='px-2 bg-green-500'>{compareMessage}</Card>
        </div>
    );
}

export default CompareQRs;
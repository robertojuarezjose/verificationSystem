'use client'
import React, { useCallback, useEffect, useRef, useState} from 'react';
import QrCode from "qrcode";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {useToast} from "@/hooks/use-toast";
import  {useReactToPrint} from "@/hooks/useReactToPrint";
import QrPrint from "@/components/QrScanner/PrintQr";
import {useSearchParams} from "next/navigation";


const SIZE: number = 500;


function QrCodePage() {

    const [qrCodeData, setQrCodeData] = useState<string | null>(null);
    const imageRef = useRef(null);
    const printRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams()
    const { toast } = useToast();







    useEffect(() => {

        if(searchParams.has("truckPlateNumber") && searchParams.has("cargoBoxNumber") && searchParams.has("cargoBoxPlateNumber") ){


            const GenerateQr = async () =>{

                const url = `?truckPlateNumber=${searchParams.get('truckPlateNumber')}&cargoBoxNumber=${searchParams.get('cargoBoxNumber')}&cargoBoxPlateNumber=${searchParams.get('cargoBoxPlateNumber')}`;

                const qrCodeDataUrl =  QrCode.toDataURL(url, {
                    width: SIZE,
                });

                setQrCodeData(await qrCodeDataUrl);
            }

            GenerateQr();



        }

    }, [qrCodeData,searchParams ]);

    const createQrCode = async () => {

        if('qrUrl' in sessionStorage){


            const url: string = sessionStorage.getItem('qrUrl') as string;


            const qrCodeDataUrl =  QrCode.toDataURL(url, {
                width: SIZE,
            });

            setQrCodeData(await qrCodeDataUrl);

        }

    }


    const handlePrint2 = useReactToPrint({
        contentRef: printRef,

    });

    // const handlePrint = useReactToPrint({
    //     contentRef: printRef,
    //     documentTitle: "AwesomeFileName",
    //     print: (iframe) => {
    //         return new Promise<void>((resolve) => {
    //             console.log("Custom printing, 1.5 second mock delay...");
    //             setTimeout(() => {
    //                 console.log("Mock custom print of iframe complete", iframe);
    //                 resolve();
    //             }, 1500);
    //         });
    //     },
    // });



    const handleOnClick = useCallback(() => {
        handlePrint2();
    }, [handlePrint2]);

    function handleCopyImage(){
        if (!!imageRef.current) {
            const canvas: HTMLCanvasElement = document.createElement("canvas");
            canvas.width = SIZE;
            canvas.height = SIZE;
            // @ts-expect-error: Just go with it man

            canvas.getContext("2d").drawImage(imageRef.current, 0, 0, SIZE, SIZE);
            /* eslint-disable @typescript-eslint/no-explicit-any */
            canvas.toBlob((blob: any) => {
                navigator.clipboard.write([
                    new ClipboardItem({
                        "image/png": blob,
                    }),
                ]);
            }, "image/png");

            toast({ description: 'Qr Code Copied' });
        }
    }

    useEffect(() => {

        if('qrUrl' in sessionStorage){
            setLoading(true);
        }else{
            setLoading(false);
        }

        const timeoutId = setTimeout(() =>{

            createQrCode().then( () => {console.log("success")});
            setLoading(false);
        }, 2000);




        return () =>clearTimeout(timeoutId);


    }, []);




    if(loading) {

        return <h3 className='flex flex-col justify-center items-center font-semibold'>Loading...</h3>
    }

    if(!qrCodeData) {

        return <h3 className='flex flex-col justify-center items-center font-semibold'>No Qr generated to display</h3>
    }







    return (
        <section className='flex flex-col justify-center items-center'>

            <h3 className='font-semibold'>Qr Code Generated</h3>
            {qrCodeData && (

                    <>


                        <QrPrint ref={printRef} >
                            < Image ref={imageRef} src={qrCodeData} alt="Generated QR Code" width={SIZE} height={SIZE}/>
                        </QrPrint>


                        <div className={cn("flex flex-col sm:flex-row gap-5 mt-5")}>
                            <a
                                download
                                href={qrCodeData}
                                className={cn("bg-orange-500 px-4 py-3 rounded text-white")}
                            >
                                Download QR Code
                            </a>

                            <button
                                onClick={handleCopyImage}
                                className={cn(
                                    "bg-green-600" + " py-3 px-4 rounded" + " text-white",
                                )}
                            >
                                Copy Image
                            </button>

                            <button
                                onClick={handleOnClick}
                                className={cn(
                                    "bg-gray-500" + " py-3 px-4 rounded" + " text-white",
                                )}
                            >
                                Print Qr Code
                            </button>


                        </div>
                    </>


            )


            }

        </section>

    );
}

export default QrCodePage;
'use client'

import WebcamCapture from "@/components/QrScanner/WebcamCapture";
import jsQR, {QRCode} from 'jsqr';



type QRScannerProps =  {
    updateState?: ( (code: QRCode) => void)
    updateUrlState?: (url: string) => void;


}

const QRScanner = ({ updateState, updateUrlState }: QRScannerProps ) => {





    const handleScan = (imageSrc: string ) => {
        if (imageSrc) {
            const image = new Image();
            image.src =  imageSrc ;
            image.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext("2d");


                if (ctx) {

                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert"});
                    if (code) {

                        console.log(`codexx: ${code.data}`);
                        if (updateState){


                            updateState(code);

                            if (updateUrlState){
                                updateUrlState(code.data);
                            }


                        }







                        console.log("code: ", code);
                    }
                    else {
                        console.log("no code found");
                    }
                }

            }
        }
    }

    return (
            <WebcamCapture onScan={handleScan} />

    );
}

export default QRScanner;
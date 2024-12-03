'use client'
import React, {useEffect, useRef, useState} from "react";
import Webcam from "react-webcam";


type webcamCaptureProps = {

    onScan: (imageSrc: string) => void;

};

const WebcamCapture = ({ onScan }: webcamCaptureProps) => {
    const webcamRef = useRef<Webcam>(null);
    const [width, setWidth] = useState(window.innerWidth < 1039 ? 320: 500);
    const [height, setHeight] = useState(window.innerHeight < 1039 ? 190: 500);

    //let width = 500;
    //let height = 500;

    useEffect(() => {
        const timer = setInterval(() => {
            capture();
        }, 500);
        return () => clearInterval(timer);
    }, []);

    //
    //width: 320,
    //height: 190,



    // if(window.innerWidth < 1039){
    //     console.log("window is less than 1039");
    //     width = 320;
    //     height = 190;
    // }else{
    //     width = 500;
    //     height = 500;
    //
    // }


    useEffect(() => {

        function reSizeCam(){
            setWidth(window.innerWidth < 1039 ? 320: 500);
            setHeight(window.innerWidth < 1039 ? 190: 500);

            console.log(`width = ${width} height: ${height}`);

        }

        window.addEventListener("resize", reSizeCam);
        return () => window.removeEventListener('resize', reSizeCam);



    }, [width,height]);


    console.log(`window width: ${window.innerWidth}`);

    const videoConstraints = {
        width: width,
        height: height,
        facingMode: "environment"
    };

    const capture = () => {

        if (!webcamRef.current) return;
        const imageSrc = webcamRef.current.getScreenshot();
        if(imageSrc === null) return;
        onScan(imageSrc);
    }

    return (
        <div >
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                onClick={() => capture() }
                className="rounded-2xl"
            />
        </div>
    );
}

export default WebcamCapture;
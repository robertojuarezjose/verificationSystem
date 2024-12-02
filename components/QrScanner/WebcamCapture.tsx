import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";


type webcamCaptureProps = {

    onScan: (imageSrc: string) => void;

};

const WebcamCapture = ({ onScan }: webcamCaptureProps) => {
    const webcamRef = useRef<Webcam>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            capture();
        }, 500);
        return () => clearInterval(timer);
    }, []);

    const videoConstraints = {
        width: 500,
        height: 500,
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
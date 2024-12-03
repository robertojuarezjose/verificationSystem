
'use server';
import QrCode from "qrcode";

import {QrGeneratorSchema, validateWithZodSchema} from "@/utils/schemas";
import db from "@/utils/db";
import {revalidatePath} from "next/cache";



const renderError = (error: unknown): { message: string } => {
    console.log(error);
    return {
        message: error instanceof Error ? error.message : 'an error occurred',
    };
};

export const generateQr= async (prevState: any, formData: FormData):Promise<{ qrCode?: any; message: string }> => {

    let qrUrl;
    try{

        const rawData = Object.fromEntries(formData);
        const validatedFields = validateWithZodSchema(QrGeneratorSchema, rawData);
        //const queryParams

        qrUrl = `?truckPlateNumber=${validatedFields.truckLicensePlate}&cargoBoxNumber=${validatedFields.cargoBoxNumber}&cargoBoxPlateNumber=${validatedFields.cargoBoxLicensePlate}`;
        let insideYard = true;
        let receivingClerkId = "0";
        let shippingClerkId = '0';


        await db.yardTraffic.create({
            data: {
                ...validatedFields, insideYard, qrUrl, receivingClerkId, shippingClerkId,
            }

        })

        revalidatePath('/yard/monitor');

        return {message: qrUrl};

    }catch(error){

        return renderError(error);
    }
}

export const fetchYardTraffic = async () => {
    const yardTraffic = await db.yardTraffic.findMany({
        orderBy: {
            createdAt: 'desc',
        }
    });

    return yardTraffic;
}

export const deleteFromYardByQrUrl = async (qrUrl: string) => {

    try{


        // await db.yardTraffic.deleteMany({
        //     where: {
        //         qrUrl: qrUrl,
        //     },
        // });


        return {message: `success`};

    }catch(error){
        return renderError(error);
    }



}
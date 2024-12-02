'use client'

import FormInput from "@/components/form/FormInput";
import {SubmitButton} from "@/components/form/Buttons";
import {generateQr} from '@/utils/actions';
import FormContainerResponseRedirect from "@/components/form/FormContainerResponseRedirect";
import {faker} from '@faker-js/faker'




function qrGenerator() {
    const truckPlateNumber = faker.vehicle.vrm()
    const cargoBoxNumber = faker.vehicle.vrm();
    const cargoBoxPlateNumber = faker.vehicle.vrm();



    const requestFunction = async (message: string) => {


        sessionStorage.setItem('qrUrl', message);

    }



    return (
        <section className='justify-center items-center flex flex-col'>



                <h1 className='text-2xl font-semibold mb-8 capitalize'>QR Generator</h1>

                <div className='border p-20 rounded-md'>
                    <FormContainerResponseRedirect action={generateQr}  functionRequest={requestFunction} redirectTo='/receiving/qrCode' responseMessage="Qr Generated Successfully" >

                        <FormInput
                            type='text'
                            name='truckLicensePlate'
                            label="Truck's Liscence Plate Number"
                            defaultValue={truckPlateNumber}
                        />

                        <div className='flex gap-2'>
                            <FormInput
                                type='text'
                                name='cargoBoxNumber'
                                label="Cargo Box's Number"
                                defaultValue={cargoBoxNumber}
                            />

                            <FormInput
                                type='text'
                                name='cargoBoxLicensePlate'
                                label='Cargo Box Liscence Plate Number'
                                defaultValue={cargoBoxPlateNumber}
                            />

                        </div>


                        <SubmitButton text='Generate Qr' className='mt-8'/>

                    </FormContainerResponseRedirect>
                </div>





        </section>

    );
}

export default qrGenerator;
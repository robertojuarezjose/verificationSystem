'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import {actionFunction} from '@/utils/types/types';


type FormContainerResponseProps = {
    action: actionFunction;
    responseMessage: string;
    children: React.ReactNode;
    functionRequest: (message: string) => void;
};

const initialState = {
    message: '',

};




function FormContainerResponse({action, responseMessage, functionRequest, children}: FormContainerResponseProps) {

    const [state, formAction] = useFormState(action, initialState);
    const { toast } = useToast();


    useEffect(() => {
        if (state.message) {


            if (functionRequest) {
                toast({ description: responseMessage });
                functionRequest(state.message);

            }
        }




    }, [state]);


    return <form action={formAction} >{children}</form>;
}
export default FormContainerResponse;

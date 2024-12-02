'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import {actionFunction} from '@/utils/types/types';

import {redirect} from "next/navigation";

type FormContainerResponseRedirectProps = {
    action: actionFunction;
    responseMessage: string;
    redirectTo: string;
    children: React.ReactNode;
    functionRequest: (message: string) => void;

};

const initialState = {
    message: '',

};




function FormContainerResponseRedirect({action,responseMessage, redirectTo, functionRequest, children}: FormContainerResponseRedirectProps) {

    const [state, formAction] = useFormState(action, initialState);
    const { toast } = useToast();


    useEffect(() => {
        if (state.message) {

            if (functionRequest) {

                toast({ description: responseMessage });
                functionRequest(state.message);
                redirect(redirectTo);
            }
        }




    }, [state]);


    return <form action={formAction} >{children}</form>;
}
export default FormContainerResponseRedirect;

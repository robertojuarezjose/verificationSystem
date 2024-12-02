import { Font } from "@/utils/types/types";
import { UseReactToPrintOptions } from "@/utils/types/types";
import { handlePrintWindowOnLoad, HandlePrintWindowOnLoadData } from "@/utils/printer/HandlePrintWindowOnLoadData";

export function appendPrintWindow(
    /** The print iframe */
    printWindow: HTMLIFrameElement,
    markLoaded: (resource: Element | Font | FontFace, errorMessages?: unknown[]) => void,
    data: HandlePrintWindowOnLoadData,
    options: UseReactToPrintOptions,
) {
    printWindow.onload = () => {
        handlePrintWindowOnLoad(
            printWindow,
            markLoaded,
            data,
            options
        );
    };

    document.body.appendChild(printWindow);
}
import type { UseReactToPrintOptions } from "@/utils/types/types";

export function removePrintIframe(preserveAfterPrint: UseReactToPrintOptions["preserveAfterPrint"], force?: boolean) {
    if (force || !preserveAfterPrint) {
        const documentPrintWindow = document.getElementById("printWindow");

        if (documentPrintWindow) {
            document.body.removeChild(documentPrintWindow);
        }
    }
}
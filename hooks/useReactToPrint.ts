import { useCallback } from "react";

import { Font } from "@/utils/types/types";
import type { UseReactToPrintOptions } from "@/utils/types/types";

import { getContentNode } from '@/utils/printer/getContentNode';

import { generatePrintWindow } from "@/utils/printer/generatePrintWindow";
import { logMessages } from "@/utils/printer/logMessages";
import { UseReactToPrintHookContent } from "@/utils/types/types";
import { HandlePrintWindowOnLoadData } from "@/utils/printer/HandlePrintWindowOnLoadData";
import { removePrintIframe } from "@/utils/printer/removePrintIframe";
import { UseReactToPrintFn } from "@/utils/types/types";
import { appendPrintWindow } from "@/utils/printer/appendPrintWindow";
import { startPrint } from "@/utils/printer/startPrint";
import { getErrorFromUnknown } from "@/utils/printer/getErrorMessage";

export function useReactToPrint(options: UseReactToPrintOptions): UseReactToPrintFn {
    const {
        contentRef,
        fonts,
        ignoreGlobalStyles,
        onBeforePrint,
        onPrintError,
        preserveAfterPrint,
        suppressErrors,
    } = options;

    const handlePrint = useCallback((optionalContent?: UseReactToPrintHookContent) => {
        // Ensure we remove any pre-existing print windows before adding a new one
        removePrintIframe(preserveAfterPrint, true);

        const contentNode = getContentNode({
            contentRef,
            optionalContent,
            suppressErrors,
        });

        if (!contentNode) {
            logMessages({
                messages: ['There is nothing to print'],
                suppressErrors,
            });
            return;
        }

        // NOTE: `canvas` elements do not have their painted images copied
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
        const clonedContentNode = contentNode.cloneNode(true);

        const globalLinkNodes = document.querySelectorAll("link[rel~='stylesheet'], link[as='style']");
        const clonedImgNodes = (clonedContentNode as Element).querySelectorAll("img");
        const clonedVideoNodes = (clonedContentNode as Element).querySelectorAll("video");

        const numFonts = fonts ? fonts.length : 0;

        const numResourcesToLoad =
            (ignoreGlobalStyles ? 0 : globalLinkNodes.length) +
            clonedImgNodes.length +
            clonedVideoNodes.length +
            numFonts;
        const resourcesLoaded: (Element | Font | FontFace)[] = [];
        const resourcesErrored: (Element | Font | FontFace)[] = [];

        const printWindow = generatePrintWindow();

        /**
         * Keeps track of loaded resources, kicking off the actual print function once all
         * resources have been marked (loaded or failed)
         */
        const markLoaded = (resource: Element | Font | FontFace, errorMessages?: unknown[]) => {
            if (resourcesLoaded.includes(resource)) {
                logMessages({
                    level: "debug",
                    messages: ["Tried to mark a resource that has already been handled", resource],
                    suppressErrors,
                });
                return;
            }

            if (!errorMessages) {
                resourcesLoaded.push(resource);
            } else {
                logMessages({
                    messages: [
                        '"react-to-print" was unable to load a resource but will continue attempting to print the page',
                        ...errorMessages
                    ],
                    suppressErrors,
                });
                resourcesErrored.push(resource);
            }

            // We may have errors, but attempt to print anyways - maybe they are trivial and the
            // user will be ok ignoring them
            const numResourcesManaged = resourcesLoaded.length + resourcesErrored.length;

            if (numResourcesManaged === numResourcesToLoad) {
                startPrint(printWindow, options);
            }
        };

        const data: HandlePrintWindowOnLoadData = {
            contentNode,
            clonedContentNode,
            clonedImgNodes,
            clonedVideoNodes,
            numResourcesToLoad,
            originalCanvasNodes: (contentNode as Element).querySelectorAll("canvas")
        }

        // Ensure we run `onBeforePrint` before appending the print window, which kicks off loading
        // needed resources once mounted
        if (onBeforePrint) {
            onBeforePrint()
                .then(() => {
                    appendPrintWindow(printWindow, markLoaded, data, options);
                })
                .catch((error: unknown) => {
                    onPrintError?.("onBeforePrint", getErrorFromUnknown(error));
                });
        } else {
            appendPrintWindow(printWindow, markLoaded, data, options);
        }
    }, [options]);

    return handlePrint;
}
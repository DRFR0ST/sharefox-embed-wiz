import { useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { embedPropsState, embedStyleState, embedTypeState, embedUrlState, hostnameState, siteNameState } from "./store";
import { generateEmbedScript } from "./utils";

/**
 * Hook that appends and removes the Sharefox embed script.
 * 
 * @returns {String} String representation of the embed script.
 */
export const useSiteScript = () => {
    const siteName = useRecoilValue(siteNameState);
    const embedType = useRecoilValue(embedTypeState);
    const embedProps = useRecoilValue(embedPropsState);
    const embedStyle = useRecoilValue(embedStyleState);
    const hostname = useRecoilValue(hostnameState);
    const embedUrl = useRecoilValue(embedUrlState);

    const script = useMemo(() => generateEmbedScript({ siteName, hostname }), [siteName, hostname]);

    useEffect(() => {
        if(!siteName) {
            console.error("No site name provided.")
            return;
        }

        const _script = document.createElement('script');
        _script.src = embedUrl || `https://${siteName}.mysharefox.com/embed.min.js`;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _script['data-shop'] = siteName;
        _script.id = "sharefox-embed-script";
        _script.async = true;
        if(hostname)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            _script['data-hostname'] = hostname;

        setTimeout(() => {
            document.body.appendChild(_script);
        }, 500);
        
        return () => {
            try {
                document.body.removeChild(_script);
            } catch(err: unknown) {
                console.warn("Unable to remove child.", err);
            }
        }
    }, [script, siteName, embedType, embedProps, embedStyle]);

    return script;
}
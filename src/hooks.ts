import { useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { embedPropsState, embedStyleState, embedTypeState, siteNameState } from "./store";
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

    const script = useMemo(() => generateEmbedScript({ siteName }), [siteName]);

    useEffect(() => {
        if(!siteName) {
            console.error("No site name provided.")
            return;
        }

        const _script = document.createElement('script');
        _script.src = `https://${siteName}.mysharefox.com/embed.min.js`;
        _script['data-shop'] = siteName;
        _script.id = "sharefox-embed-script";
        _script.async = true;

        setTimeout(() => {
            document.body.appendChild(_script);
        }, 500);
        
        return () => {
            try {
                document.body.removeChild(_script);
            } catch(err) {
                console.warn("Unable to remove child.")
            }
        }
    }, [script, siteName, embedType, embedProps, embedStyle]);

    return script;
}
import { useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import {
  dataStagingState,
  embedPropsState,
  embedStyleState,
  embedTypeState,
  embedUrlState,
  hostnameState,
  siteNameState,
  useOtpState,
  localeState,
} from "./store";
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
  const dataStaging = useRecoilValue(dataStagingState);
  const useOtp = useRecoilValue(useOtpState);
  const locale = useRecoilValue(localeState);

  const script = useMemo(
    () => generateEmbedScript({ siteName, hostname, embedUrl, dataStaging, useOtp, locale }),
    [siteName, hostname, embedUrl, dataStaging, useOtp, locale]
  );

  useEffect(() => {
    if (!siteName) {
      console.error("No site name provided.");
      return;
    }

    const _script = document.createElement("script");
    _script.src = embedUrl || `https://${siteName}.mysharefox.com/embed.min.js`;
    _script.setAttribute("data-shop", siteName);
    _script.id = "sharefox-embed-script";
    _script.async = true;
    let finalHostname = hostname || `https://${siteName}.mysharefox.com`;
    if (locale) {
      finalHostname = finalHostname.replace(/\/+$/, '') + `/${locale.replace(/^\/+/, '')}`;
    }

    if (hostname || locale) {
      _script.setAttribute("data-hostname", finalHostname);
    } else if (!dataStaging) {
      _script.setAttribute(
        "data-hostname",
        `https://${siteName}.mysharefox.com`
      );
    }

    _script.setAttribute("data-staging", dataStaging ? "true" : "false");
    
    if (useOtp) {
      _script.setAttribute("data-useotp", "true");
    }

    const timeoutId = setTimeout(() => {
      // Remove any existing script with the same ID before appending a new one
      const existingScript = document.getElementById("sharefox-embed-script");
      if (existingScript) {
        existingScript.remove();
      }
      document.body.appendChild(_script);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      try {
        if (document.body.contains(_script)) {
          document.body.removeChild(_script);
        }
      } catch (err: unknown) {
        console.warn("Unable to remove child.", err);
      }
    };
  }, [
    script,
    siteName,
    embedType,
    embedProps,
    embedStyle,
    embedUrl,
    dataStaging,
    hostname,
    useOtp,
  ]);

  return script;
};
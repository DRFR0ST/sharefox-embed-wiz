import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { embedTypeState, embedStyleState } from "../store";
import { Stack, Typography } from "@mui/material";

const EmbedPreview = ({div}: {div: string|undefined}) => {
    const embedType = useRecoilValue(embedTypeState);
    const [, setEmbedStyle] = useRecoilState(embedStyleState);

    const [mountDiv, setMountDiv] = useState(false);
    const [displayLoading, setDisplayLoading] = useState(true);

    useEffect(() => {
        const tmOut = setTimeout(() => {
            setMountDiv(true);
        }, 600);

        return () => {
            clearTimeout(tmOut);
        }
    }, [embedType]);

    const embedStyle = useRecoilValue(embedStyleState);
    const embedContainerRect = embedStyle;

    const embedContainerRef = useRef(null);

    const borderWidth = 4;

    useEffect(() => {
        setDisplayLoading(true);

        const tmOut = setTimeout(() => {
            setDisplayLoading(false);
        }, 800);

        return () => {
            clearTimeout(tmOut);
        };
    }, [embedType]);


    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        width="100%"
        minHeight="70vh"
        maxWidth="100%"
        position="relative"
      >
        {mountDiv && (
          <Typography variant="h6" sx={{ position: "absolute", lineHeight: 0, opacity: displayLoading ? 0.4 : 0, transition: "opacity 255ms ease", }}>
            Loading...
          </Typography>
        )}
        {mountDiv && (
          <div
            ref={embedContainerRef}
            style={{
              overflow: "hidden",
              // resize: "both",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `${borderWidth}px dashed #dcdfdd`,
            }}
            key={embedType}
            dangerouslySetInnerHTML={{ __html: div! }}
          ></div>
        )}
        {mountDiv && embedContainerRect.width ? (
          <Typography sx={{ mt: 1, opacity: 0.4 }} fontSize={13}>
            {embedContainerRect.width}px x {embedContainerRect.height}px
          </Typography>
        ) : null}
      </Stack>
    );
}

export default EmbedPreview;
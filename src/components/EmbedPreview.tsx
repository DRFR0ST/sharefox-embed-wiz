import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { embedTypeState } from "../store";
import { Stack, Typography } from "@mui/material";


const EmbedPreview = ({div}: {div: string|undefined}) => {
    const embedType = useRecoilValue(embedTypeState);

    const [mountDiv, setMountDiv] = useState(false);

    useEffect(() => {
        const tmOut = setTimeout(() => {
            embedType &&
                setMountDiv(true);
        }, 600);

        return () => {
            clearTimeout(tmOut);
        }
    }, [embedType]);


    const [embedContainerRect, setEmbedContainerRect] = useState({
        width: 0,
        height: 0
    });

    const embedContainerRef = useRef(null);

    const borderWidth = 4;

    useEffect(() => {
        const tmOut = setTimeout(() => {
            const boundingClientRect = embedContainerRef?.current?.getBoundingClientRect();

            if (!boundingClientRect) {
                setEmbedContainerRect({
                    width: 0,
                    height: 0
                })
            }

            setEmbedContainerRect({
                width: boundingClientRect.width.toFixed(0) - (borderWidth * 2),
                height: boundingClientRect.height.toFixed(0) - (borderWidth * 2)
            });
        }, 800);

        return () => {
            clearTimeout(tmOut);
        }
    }, [embedType]);


    return            <Stack alignItems="center" justifyContent="center" width="100%" height="70vh" maxWidth="100%">
    {mountDiv && <div ref={embedContainerRef} style={{ overflow: "hidden", resize: "both", position: "relative", display: 'flex', alignItems: 'center', justifyContent: 'center', border: `${borderWidth}px dashed #dcdfdd` }} key={Math.random().toString() + embedType} dangerouslySetInnerHTML={{ __html: div! }} />}
    {embedContainerRect.width ? <Typography sx={{ mt: 1, opacity: 0.4 }} fontSize={13}>{embedContainerRect.width} x {embedContainerRect.height}</Typography> : null}
</Stack>
}

export default EmbedPreview;
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

    const [embedStyle, setEmbedStyleState] = useRecoilState(embedStyleState);
    const embedContainerRect = embedStyle;

    const embedContainerRef = useRef(null);

    const borderWidth = 4;

    /**
     * This effect runs when the component mounts or when the embedType changes.
     * It sets a timeout to calculate the dimensions of the embed container after a delay.
     * If the bounding rectangle is not available, it resets the dimensions to 0.
     */
    useEffect(() => {
        setDisplayLoading(true);

        // Set a timeout to calculate the dimensions of the embed container after a delay
        const tmOut = setTimeout(() => {
            // Get the bounding rectangle of the embed container
            const boundingClientRect = embedContainerRef?.current?.getBoundingClientRect();

            // If the bounding rectangle is not available, reset the dimensions to 0
            if (!boundingClientRect) {
                setEmbedStyleState({
                    width: 0,
                    height: 0
                });
            }

            // Update the dimensions of the embed container, subtracting the border width
            setEmbedStyleState({
                width: boundingClientRect.width.toFixed(0) - (borderWidth * 2),
                height: boundingClientRect.height.toFixed(0) - (borderWidth * 2)
            });

            setDisplayLoading(false);
        }, 800);

        // Cleanup function to clear the timeout when the component unmounts or dependencies change
        return () => {
            clearTimeout(tmOut);
        };
    }, [embedType]); // Re-run the effect when the embedType changes

    // Function to handle the resize event and update the embed container dimensions
    const handleResize = () => {
        // Get the bounding rectangle of the embed container
        const boundingClientRect = embedContainerRef?.current?.getBoundingClientRect();

        // If the bounding rectangle is not available, reset the dimensions to 0
        if (!boundingClientRect) {
            setEmbedStyleState({
                width: 0,
                height: 0
            });
            setEmbedStyle((prev: any) => ({ ...prev, width: 0, height: 0 }));
            return;
        }

        // Update the dimensions of the embed container, subtracting the border width
        const newWidth = boundingClientRect.width.toFixed(0) - (borderWidth * 2);
        const newHeight = boundingClientRect.height.toFixed(0) - (borderWidth * 2);

        setEmbedStyleState({
            width: newWidth,
            height: newHeight
        });

        // Save the updated dimensions in the store
        setEmbedStyle((prev) => ({ ...prev, width: newWidth, height: newHeight }));
    };

    // Effect to add and clean up the resize event listener
    useEffect(() => {
        // Add the resize event listener to the window
        window.addEventListener("resize", handleResize);

        // Cleanup function to remove the resize event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [embedContainerRef]); // Re-run the effect when the embedContainerRef changes

    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="70vh"
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
            key={Math.random().toString() + embedType}
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
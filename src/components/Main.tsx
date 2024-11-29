import { Box, Button, Container, Stack, Typography, useTheme } from "@mui/material";
import { useRecoilValue } from "recoil";
import { embedPropsState, embedStyleState, embedTypeState, siteNameState } from "../store";
import { useEffect, useMemo, useRef, useState } from "react";
import { generateEmbedDiv, generateEmbedScript } from "../utils";
import Editor, { Monaco, loader } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import * as monaco from 'monaco-editor';

loader.config({ monaco });

// eslint-disable-next-line promise/catch-or-return, promise/always-return
loader.init().then((mnco) => {
    mnco.editor.defineTheme('sharefox-light', {
        base: 'vs',
        inherit: true,
        rules: [],
        colors: {
            'editor.background': '#eff5f1',
            'editor.focusBorder': '#eff5f1'
        },
    });
});

function Main() {
    const theme = useTheme();
    const siteName = useRecoilValue(siteNameState);
    const embedType = useRecoilValue(embedTypeState);
    const embedProps = useRecoilValue(embedPropsState);
    const embedStyle = useRecoilValue(embedStyleState);

    const script = useMemo(() => generateEmbedScript({ siteName }), [siteName]);
    const div = useMemo(() => generateEmbedDiv({ siteName, embedType }, embedProps, embedStyle), [siteName, embedType, embedProps, embedStyle]);

    const [mountDiv, setMountDiv] = useState(false);

    const editorRef = useRef<editor.IStandaloneCodeEditor>(null);

    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
        // here is the editor instance
        // you can store it in `useRef` for further usage
        editorRef.current = editor;
    }

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

    useEffect(() => {
        const _script = document.createElement('script');
        _script.src = `https://${siteName}.mysharefox.com/embed.min.js`;
        _script['data-shop'] = siteName;
        _script.id = "sharefox-embed-script";
        _script.async = true;

        const tmOut = setTimeout(() => {
            document.body.appendChild(_script);

            const boundingClientRect = embedContainerRef?.current?.getBoundingClientRect();

            if(!boundingClientRect) {
                setEmbedContainerRect({
                    width: 0,
                    height: 0
                })
            }
    
            setEmbedContainerRect({
                width: boundingClientRect.width.toFixed(0),
                height: boundingClientRect.height.toFixed(0)
            });
        }, 800);

        return () => {
            try {
                document.body.removeChild(_script);
            } catch (err) {

            }
            clearTimeout(tmOut);
        }
    }, [script, siteName, embedType, embedProps, embedStyle]);

    useEffect(() => {
        
        // editor.defineTheme('myTheme', {
        //             base: 'vs',
        //             inherit: true,
        //             colors: {
        //                 "background": theme.palette.background.paper,
        //                 "editor.background": theme.palette.background.paper,
        //                 "editor.foreground": theme.palette.text.primary,
        //                 "editor.lineHighlightBackground": theme.palette.background.paper,

        //             }
        //         } as any);

    }, [])


    return <Container sx={{ backgroundColor: theme.palette.background.default, height: "100%" }}>
        <Stack width="100%" direction="row" justifyContent="flex-end" alignItems="center" height="64px">
            <Button href="https://help.sharefox.no/article/580-sharefox-embed" target="_blank" variant="text">Help Article</Button>
        </Stack>
        <Stack direction="column" width="100%" height="calc(100vh-64px)" alignItems="center" justifyContent="center">
            <Stack alignItems="center" justifyContent="center" width="100%" height="70vh">
                {mountDiv && <div ref={embedContainerRef} style={{ overflow: "hidden", resize: "both", position: "relative", display: 'flex', alignItems: 'center', justifyContent: 'center', border: `4px dashed #e9efec` }} key={Math.random().toString() + embedType} dangerouslySetInnerHTML={{ __html: div! }} />}
                {embedContainerRect.width ? <Typography sx={{ mt: 1, opacity: 0.4 }} fontSize={13}>{embedContainerRect.width} x {embedContainerRect.height}</Typography> : null}
            </Stack>
            <Box sx={{ width: "100%", overflowX: "scroll", p: 2, backgroundColor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius }}>
                <Editor 
                theme="sharefox-light" 
                onMount={handleEditorDidMount} 
                height="120px" 
                options={{
                    minimap: {
                        enabled: false,
                    },
                    lineNumbers: 'off',
                    readOnly: false,
                    padding: {
                        top: 5,
                    },
                    stickyScroll: {
                        enabled: false,
                    },
                    formatOnPaste: true,
                    automaticLayout: true,
                    fontSize: 14,
                }} 
                defaultLanguage="html" 
                value={`<!-- Place the node where the embed should be displayed. -->\n${div}\n\n<!-- Place the script at the very bottom of the <body> element. -->\n${script}`} />
            </Box>
        </Stack>
    </Container>
}

export default Main;
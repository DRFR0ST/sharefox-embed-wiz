import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import { useRecoilValue } from "recoil";
import { embedPropsState, embedStyleState, embedTypeState, siteNameState } from "../store";
import { useEffect, useMemo, useRef, useState } from "react";
import { generateEmbedDiv, generateEmbedScript } from "../utils";
import Editor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

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
        }, 1000);

        return () => {
            clearTimeout(tmOut);
        }
    }, [embedType]);

    useEffect(() => {
        const _script = document.createElement('script');
        _script.src = `https://${siteName}.mysharefox.com/embed.min.js`;
        _script['data-shop'] = siteName;
        _script.id = "sharefox-embed-script";
        _script.async = true;

        const tmOut = setTimeout(() => {
            document.body.appendChild(_script);
        }, 1200);

        return () => {
            try {
                document.body.removeChild(_script);
            } catch (err) {

            }
            clearTimeout(tmOut);
        }
    }, [script, siteName, embedType, embedProps, embedStyle]);

    useEffect(() => {
            editor.defineTheme('myTheme', {
                        base: 'vs',
                        inherit: true,
                        colors: {
                            "background": theme.palette.background.paper,
                            "editor.background": theme.palette.background.paper,
                            "editor.foreground": theme.palette.text.primary,
                            "editor.lineHighlightBackground": theme.palette.background.paper,
                            
                        }
                    } as any);
        
    }, [])

    return <Container sx={{ backgroundColor: theme.palette.background.default, height: "100%", width: "70vw", maxWidth: "800px" }}>
        <Stack direction="column" width="100%" height="100%" alignItems="center" justifyContent="center">
            <Stack alignItems="center" justifyContent="center" width="100%" height="75vh">
                {mountDiv && <div style={{ width: "80%", display: 'flex', alignItems: 'center', justifyContent: 'center', border: `4px dashed ${theme.palette.background.paper}` }} key={Math.random().toString() + embedType} dangerouslySetInnerHTML={{ __html: div! }} />}
            </Stack>
            <Box sx={{ width: "100%", overflowX: "scroll", p: 2, backgroundColor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius }}>
                <Editor onMount={handleEditorDidMount} theme={"myTheme"} height="22vh" options={{ minimap: { enabled: false } }} defaultLanguage="html" defaultValue={`<!-- Place the node where the embed should be displayed. -->\n${div}\n\n<!-- Place the script at the very bottom of the <body> element. -->\n${script}`} />
            </Box>
        </Stack>
    </Container>
}

export default Main;
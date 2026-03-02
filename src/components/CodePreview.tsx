import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { useRef, useState } from "react";
import Editor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { Check, ContentCopy } from "@mui/icons-material";

function CodePreview({ div, script }: { div: string | undefined; script: string; }) {
    const theme = useTheme();

    const [copied, setCopied] = useState(false);
    const editorRef = useRef<editor.IStandaloneCodeEditor>(null);

    const codeValue = `<!-- Place the node where the embed should be displayed. -->\n${div}\n\n<!-- Place the script at the very bottom of the <body> element. -->\n${script}`;

    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
        editorRef.current = editor;
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(codeValue);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Box sx={{ 
            width: "100%", 
            p: 2, 
            backgroundColor: theme.palette.background.paper, 
            borderRadius: theme.shape.borderRadius,
            position: 'relative',
        }}>
            <Tooltip title={copied ? "Copied!" : "Copy code"}>
                <IconButton
                    onClick={handleCopy}
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 10,
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        }
                    }}
                    size="small"
                >
                    {copied ? <Check fontSize="small" color="success" /> : <ContentCopy fontSize="small" />}
                </IconButton>
            </Tooltip>
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
            value={codeValue} />
        </Box>
    );
}

export default CodePreview;
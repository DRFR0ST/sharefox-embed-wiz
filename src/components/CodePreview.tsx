import { Box, useTheme } from "@mui/material";
import { useRef } from "react";
import Editor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

function CodePreview({ div, script }: { div: string | undefined; script: string; }) {
    const theme = useTheme();

    const editorRef = useRef<editor.IStandaloneCodeEditor>(null);

    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
        // here is the editor instance
        // you can store it in `useRef` for further usage
        editorRef.current = editor;
    }

    return <Box sx={{ width: "100%", p: 2, backgroundColor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius }}>
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
    </Box>;
}

export default CodePreview;
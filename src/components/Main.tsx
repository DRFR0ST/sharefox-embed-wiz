import { Button, Container, Stack, useTheme } from "@mui/material";
import { useRecoilValue } from "recoil";
import { embedPropsState, embedStyleState, embedTypeState, siteNameState } from "../store";
import { useMemo } from "react";
import { generateEmbedDiv } from "../utils";
import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useSiteScript } from "../hooks";
import CodePreview from "./CodePreview";
import EmbedPreview from "./EmbedPreview";

loader.config({ monaco });

// eslint-disable-next-line promise/catch-or-return, promise/always-return
loader.init().then((mnco) => {
    mnco.editor.defineTheme('sharefox-light', {
        base: 'vs',
        inherit: true,
        rules: [],
        colors: {
            'editor.background': '#e9efeb',
            'editor.focusBorder': '#e9efeb'
        },
    });
});

function Main() {
    const script = useSiteScript();

    const theme = useTheme();
    const siteName = useRecoilValue(siteNameState);
    const embedType = useRecoilValue(embedTypeState);
    const embedProps = useRecoilValue(embedPropsState);
    const embedStyle = useRecoilValue(embedStyleState);

    const div = useMemo(() => generateEmbedDiv({ siteName, embedType }, embedProps, embedStyle), [siteName, embedType, embedProps, embedStyle]);

    return <Container sx={{ backgroundColor: theme.palette.background.default, height: "100%" }}>
        <Stack width="100%" direction="row" justifyContent="flex-end" alignItems="center" height="64px">
            <Button href="https://help.sharefox.no/article/580-sharefox-embed" target="_blank" variant="text">Help Article</Button>
        </Stack>

        <Stack direction="column" width="100%" height="calc(100vh-64px)" alignItems="center" justifyContent="center">
            <EmbedPreview div={div} />

            <CodePreview div={div} script={script} />
        </Stack>
    </Container>
}

export default Main;
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { embedPropsState, embedStyleState, embedTypeState, embedUrlState, hostnameState, siteNameState } from "../store";
import { EMBED_FIELDS, EMBED_STYLE } from "../constants";
import { useMemo } from "react";
import { Box, Button, Stack } from "@mui/material";
import EmbedPropsForm from "./EmbedPropsForm";
import { flattenEmbedFields } from "../utils";
import EmbedStyleForm from "./EmbedStyleForm";
import EmbedAdvancedForm from "./EmbedAdvancedForm";

interface Form {

}

const Form = ({ }: Form) => {
    const [embedType, setEmbedType] = useRecoilState(embedTypeState);

    const [, setEmbedProps] = useRecoilState(embedPropsState);
    const [, setEmbedStyle] = useRecoilState(embedStyleState);

    const [, setHostname] = useRecoilState(hostnameState);
    const [, setEmbedUrl] = useRecoilState(embedUrlState);

    const defaultValues = useMemo(() => {
        const ep = EMBED_FIELDS[embedType];
        const es = EMBED_STYLE[embedType];
        const eao = {
            hostname: "",
            embedUrl: ``
        };

        const flattenedProps = flattenEmbedFields(ep);

        return { ...flattenedProps, ...es, ...eao }
    }, [embedType]);

    const methods = useForm<any>({ defaultValues });
    const onSubmit: SubmitHandler<any> = data => {
        const { width, height, embedUrl, hostname, ...props } = data;

        console.log(data);

        setEmbedStyle({width, height});
        setHostname(hostname);
        setEmbedUrl(embedUrl || `https://${props?.siteName}.mysharefox.com/embed.min.js`)
        setEmbedProps(props);
    }

    return (
        <FormProvider {...methods} >
            <Box component="form" sx={{ width: "100%" }} onSubmit={methods.handleSubmit(onSubmit)}>
                <Stack spacing={2} direction="column" height="100%" width="100%" alignItems="center" justifyContent="center">
                    <EmbedPropsForm />
                    <EmbedStyleForm />
                    <EmbedAdvancedForm />
                    <Button style={{ marginTop: "32px" }} size="large" type="submit" variant="contained">Generate</Button>
                </Stack>
            </Box>
        </FormProvider>
    )
}

export default Form;
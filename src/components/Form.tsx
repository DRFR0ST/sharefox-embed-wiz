import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { embedPropsState, embedStyleState, embedTypeState } from "../store";
import { EMBED_FIELDS, EMBED_STYLE } from "../constants";
import { useMemo } from "react";
import { Box, Button, Stack } from "@mui/material";
import EmbedPropsForm from "./EmbedPropsForm";
import { flattenEmbedFields } from "../utils";
import EmbedStyleForm from "./EmbedStyleForm";

interface Form {

}

const Form = ({ }: Form) => {
    const [embedType, setEmbedType] = useRecoilState(embedTypeState);

    const [embedProps, setEmbedProps] = useRecoilState(embedPropsState);
    const [embedStyle, setEmbedStyle] = useRecoilState(embedStyleState);

    const defaultValues = useMemo(() => {
        const ep = EMBED_FIELDS[embedType];
        const es = EMBED_STYLE[embedType];

        const flattenedProps = flattenEmbedFields(ep);

        return { ...flattenedProps, ...es }
    }, [embedType]);

    const methods = useForm<any>({ defaultValues });
    const onSubmit: SubmitHandler<any> = data => {
        const { width, height, ...props } = data;

        setEmbedStyle({width, height});
        setEmbedProps(props);
    }

    return (
        <FormProvider {...methods} >
            <Box component="form" sx={{ width: "100%" }} onSubmit={methods.handleSubmit(onSubmit)}>
                <Stack spacing={2} direction="column" height="100%" width="100%" alignItems="center" justifyContent="center">
                    <EmbedPropsForm />
                    <EmbedStyleForm />
                    <Button size="large" type="submit" variant="contained">Generate</Button>
                </Stack>
            </Box>
        </FormProvider>
    )
}

export default Form;
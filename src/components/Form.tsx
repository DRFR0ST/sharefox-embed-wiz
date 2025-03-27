import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { embedPropsState, embedStyleState, embedTypeState, embedUrlState, hostnameState, siteNameState } from "../store";
import { EMBED_FIELDS, EMBED_STYLE } from "../constants";
import { useMemo } from "react";
import { Box, Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import EmbedPropsForm from "./EmbedPropsForm";
import { flattenEmbedFields } from "../utils";
import EmbedStyleForm from "./EmbedStyleForm";
import EmbedAdvancedForm from "./EmbedAdvancedForm";
import { SettingsBackupRestore } from "@mui/icons-material";

interface Form {

}

const Form = ({ }: Form) => {
  const [embedType] = useRecoilState(embedTypeState);
  const [siteName] = useRecoilState(siteNameState);

  const [, setEmbedProps] = useRecoilState(embedPropsState);
  const [, setEmbedStyle] = useRecoilState(embedStyleState);

  const [, setHostname] = useRecoilState(hostnameState);
  const [, setEmbedUrl] = useRecoilState(embedUrlState);

  const defaultValues = useMemo(() => {
    const ep = EMBED_FIELDS[embedType];
    const es = EMBED_STYLE[embedType];
    const eao = {
      hostname: "",
      embedUrl: "",
    };

    const flattenedProps = flattenEmbedFields(ep);

    return { ...flattenedProps, ...es, ...eao };
  }, [embedType]);

  const methods = useForm<any>({ defaultValues });
  
  const onSubmit: SubmitHandler<any> = (data) => {
    const { width, height, embedUrl, hostname, ...props } = data;

    setEmbedStyle({ width, height });
    setHostname(hostname);
    setEmbedUrl(embedUrl || `https://${siteName}.mysharefox.com/embed.min.js`);
    setEmbedProps(props);
  };

  /**
   * Reset all embed properties to default values.
   */
  const handleReset = () => {
    setEmbedProps(flattenEmbedFields(EMBED_FIELDS[embedType]));
    setEmbedStyle(EMBED_STYLE[embedType]);
    setHostname("");
    setEmbedUrl("");

    methods.reset();
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <div></div>
        <Typography gutterBottom style={{ opacity: 0.6 }}>
          Embed Properties
        </Typography>
        <Tooltip title="Reset all embed properties">
          <IconButton size="small" onClick={handleReset}>
            <SettingsBackupRestore fontSize="10px" />
          </IconButton>
        </Tooltip>
      </Stack>

      <FormProvider {...methods}>
        <Box
          component="form"
          sx={{ width: "100%" }}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Stack
            spacing={2}
            direction="column"
            height="100%"
            width="100%"
            alignItems="center"
            justifyContent="center"
          >
            <EmbedPropsForm />
            <EmbedStyleForm />
            <EmbedAdvancedForm />

            <Button
              style={{ marginTop: "42px" }}
              sx={{ paddingX: 8, paddingY: 3 }}
              size="large"
              color="primary"
              type="submit"
              variant="outlined"
            >
              Generate
            </Button>
          </Stack>
        </Box>
      </FormProvider>
    </>
  );
}

export default Form;
import { Controller, useFormContext } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { siteNameState } from "../store";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface EmbedAdvancedFormProps {}

const EmbedAdvancedForm = ({}: EmbedAdvancedFormProps) => {
  const siteName = useRecoilValue(siteNameState);

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Accordion
      sx={{ width: "100%", borderRadius: "4px" }}
      square={true}
      variant="outlined"
    >
      <AccordionSummary
        sx={{ borderTop: "none" }}
        expandIcon={<ArrowDropDownIcon />}
      >
        <Typography>Advanced Options</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ borderTop: "none" }}>
        <Stack spacing={2} width="100%">
          <TextField
            fullWidth
            label="Hostname"
            type="string"
            helperText="The hostname of the site that the embed will be loaded from."
            error={Boolean(errors["hostname"])}
            placeholder={`https://${siteName}.mysharefox.com`}
            {...register("hostname", { required: false })}
          />
          <TextField
            fullWidth
            label="Embed URL"
            type="string"
            helperText="The url pointing to the embed script."
            error={Boolean(errors["embedUrl"])}
            placeholder={`https://${siteName}.mysharefox.com/embed.min.js`}
            {...register("embedUrl", { required: false })}
          />
          {/* <Controller
            name="dataStaging"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value ?? false} />}
                label="Use Staging Environment"
              />
            )}
          /> */}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default EmbedAdvancedForm;

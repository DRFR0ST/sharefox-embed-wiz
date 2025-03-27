import { useFormContext } from "react-hook-form";
import { useRecoilState } from "recoil";
import { embedTypeState } from "../store";
import { EMBED_FIELDS } from "../constants";
import { TextField } from "@mui/material";

interface EmbedPropsForm {

}

const EmbedPropsForm = ({ }: EmbedPropsForm) => {
    const [embedType] = useRecoilState(embedTypeState);

    const { register, formState: { errors } } = useFormContext();

    return (
        <>
            {
                Object.keys(EMBED_FIELDS[embedType]).
                    map(key => (
                        <TextField
                            key={key}
                            fullWidth
                            label={EMBED_FIELDS[embedType][key].label}
                            type={EMBED_FIELDS[embedType][key].type}
                            helperText={EMBED_FIELDS[embedType][key].description}
                            defaultValue={EMBED_FIELDS[embedType][key].value}
                            error={Boolean(errors[key])}
                            {...register(key, { required: true })}
                        />
                    ))
            }
        </>
    )
}

export default EmbedPropsForm;
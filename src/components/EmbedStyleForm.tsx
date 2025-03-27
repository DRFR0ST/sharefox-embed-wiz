import { useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import { useRecoilValue } from "recoil";
import { siteNameState } from "../store";

interface EmbedStyleForm {

}

const EmbedStyleForm = ({ }: EmbedStyleForm) => {
    useRecoilValue(siteNameState);
    const { register, formState: { errors } } = useFormContext();
    
    return (
        <>
            <TextField
                fullWidth
                label="Width"
                type="string"
                helperText="The width of the iframe inside of which the embed will be displayed."
                error={Boolean(errors["width"])}
                {...register("width", { required: true })}
            />

            <TextField
                fullWidth
                label="Height"
                type="string"
                helperText="The height of the iframe inside of which the embed will be displayed."
                error={Boolean(errors["height"])}
                {...register("height", { required: true })}
            />
        </>
    )
}

export default EmbedStyleForm;
import { useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { embedStyleState, siteNameState } from "../store";
import { useEffect } from "react";

interface EmbedStyleForm {

}

const EmbedStyleForm = ({ }: EmbedStyleForm) => {
    const [embedStyle, setEmbedStyle] = useRecoilState(embedStyleState);
    useRecoilValue(siteNameState);
    const { register, formState: { errors }, setValue } = useFormContext();

    // Update form values when embedStyle changes
    useEffect(() => {
        setValue("width", embedStyle.width);
        setValue("height", embedStyle.height);
    }, [embedStyle, setValue]);

    return (
        <>
            <TextField
                fullWidth
                label="Width"
                type="number"
                helperText="The width of the iframe inside of which the embed will be displayed."
                error={Boolean(errors["width"])}
                slotProps={{
                    input: {
                        endAdornment: "px",
                    }
                }}
                {...register("width", { required: true, onChange: (e) => setEmbedStyle((prev) => ({ ...prev, width: e.target.value })) })}
            />

            <TextField
                fullWidth
                label="Height"
                type="number"
                helperText="The height of the iframe inside of which the embed will be displayed."
                error={Boolean(errors["height"])}
                slotProps={{
                    input: {
                        endAdornment: "px",
                    }
                }}
                {...register("height", { required: true, onChange: (e) => setEmbedStyle((prev) => ({ ...prev, height: e.target.value })) })}
            />
        </>
    )
}

export default EmbedStyleForm;
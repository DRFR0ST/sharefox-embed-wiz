import { Box, Container, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Tooltip, Typography, useTheme } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { siteNameState, embedTypeState, embedPropsState, embedStyleState } from "../store";
import { EMBED_FIELDS, EMBED_STYLE } from "../constants";
import { EmbedType } from "../types";
import { Favorite } from "@mui/icons-material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useRef, useState } from "react";
import Form from "./Form";
import { flattenEmbedFields } from "../utils";

function Sidebar() {
    const [siteName, setSiteName] = useRecoilState(siteNameState);
    const [embedType, setEmbedType] = useRecoilState(embedTypeState);

    const setEmbedProps = useSetRecoilState(embedPropsState);
    const setEmbedStyle = useSetRecoilState(embedStyleState);

    const [siteExists, setSiteExists] = useState(true);

    const onEmbedTypeChange = (event: any) => {
        const nextEmbedType = event.target.value as EmbedType;
        setEmbedType(nextEmbedType);

        setEmbedProps(flattenEmbedFields(EMBED_FIELDS[nextEmbedType]));
        setEmbedStyle(EMBED_STYLE[nextEmbedType]);
    }

    const theme = useTheme();

    const timeout = useRef(null);

    const handleSiteName = (e) => {
        setSiteName(e.target.value);

        clearTimeout(timeout.current);
        setSiteExists(false);

        timeout.current = setTimeout(async () => {
            try {
                // Check if site exists
                const response = await fetch(`https://storage.googleapis.com/cdn.mysharefox.com/${e?.target?.value}/uploads/files/settings.json`);
                if (response.status === 200) {
                    setSiteExists(true);
                } 
            } catch(err) {
                console.error(err);
            }
        }, 700);
    }

    return <Container sx={{ backgroundColor: theme.palette.background.paper, height: "98%", marginTop: "2%", marginLeft: "2%", marginRight: "10px", borderRadius: theme.shape.borderRadius, py: 2 }}>
        <Stack justifyContent="space-between" alignItems="center" height="100%" width="100%">
            <Stack alignItems="center" justifyContent="center" width="70%" spacing={1} pt={2}>
                <img src="https://sharefox.co/wp-content/uploads/2022/05/Sharefox_logo_dark.svg" alt="Sharefox Logo" />
                <Typography style={{ opacity: 0.6 }}>Embed Wizard</Typography>
            </Stack>

            <Stack spacing={2} direction="column" height="100%" width="100%" alignItems="center" justifyContent="center">
                <Box width="100%" >
                    <TextField 
                        fullWidth 
                        variant="outlined" 
                        value={siteName} 
                        onChange={handleSiteName} 
                        label="Site name"
                        InputProps={{
                            endAdornment: <Tooltip title={siteExists ? "Valid site" : "Invalid site"}>
                                <IconButton size="small">
                                    {siteExists ? <CheckCircleIcon style={{ color: "#4b635c" }} fontSize={"10px"} /> : <ErrorIcon style={{ color: "#ba1a1a" }} fontSize={"10px"} />}
                                </IconButton>
                            </Tooltip>
                        }} />
                </Box>
                <Box width="100%">
                    <FormControl fullWidth>
                        <InputLabel id="embed-type-select-label">Embed Type</InputLabel>
                        <Select label="Embed Type" labelId="embed-type-select-label" id="embed-type" fullWidth value={embedType} onChange={onEmbedTypeChange}>
                            <MenuItem value={EmbedType.PopularProducts}>Popular Products</MenuItem>
                            <MenuItem value={EmbedType.SimpleSearch}>Simple Search</MenuItem>
                            <MenuItem value={EmbedType.AdvancedSearch}>Advanced Search</MenuItem>
                            <MenuItem value={EmbedType.ProductBooking}>Product Booking</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box paddingY={1}>
                    <Divider />
                </Box>

                <Typography gutterBottom style={{ opacity: 0.6 }}>Embed Properties</Typography>

                <Form />
            </Stack>
            <Stack>
                <Typography fontSize={11}>Made with <Favorite sx={{ fontSize: 9, color: "#FF0000" }} /> by Mike @ Sharefox</Typography>
            </Stack>
        </Stack>
    </Container>
}

export default Sidebar;
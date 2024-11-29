import { Box, Container, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Tooltip, Typography, useTheme } from "@mui/material";
import { useRecoilState } from "recoil";
import { siteNameState, embedTypeState, embedPropsState, embedStyleState } from "../store";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { EMBED_FIELDS, EMBED_STYLE } from "../constants";
import { EmbedType } from "../types";
import { Favorite } from "@mui/icons-material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useRef, useState } from "react";

function Sidebar() {
    const [siteName, setSiteName] = useRecoilState(siteNameState);
    const [embedType, setEmbedType] = useRecoilState(embedTypeState);

    const [embedProps, setEmbedProps] = useRecoilState(embedPropsState);
    const [embedStyle, setEmbedStyle] = useRecoilState(embedStyleState);

    const [siteExists, setSiteExists] = useState(true);

    const onEmbedTypeChange = (event: any) => {
        setEmbedType(event.target.value as EmbedType);
        setEmbedProps(EMBED_FIELDS[event.target.value]);
        setEmbedStyle(EMBED_STYLE[event.target.value]);
    }

    const theme = useTheme();

    const setEmbedProperty = (property: EmbedType, value: any) => {
        setEmbedProps(currValue => {
            return {
                ...currValue,
                [property]: {
                    ...currValue[property],
                    value
                }
            }
        });
    }

    const setEmbedStyleProp = (property: keyof typeof embedStyle, value: any) => {
        setEmbedStyle(currValue => {
            return {
                ...currValue,
                [property]: value
            }
        });
    };

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

    return <Container sx={{ backgroundColor: theme.palette.background.paper, height: "98%", marginTop: "2%", marginLeft: "2%", borderRadius: theme.shape.borderRadius, py: 2 }}>
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
                        </Select>
                    </FormControl>
                </Box>

                <Box paddingY={1}>
                    <Divider />
                </Box>

                <Typography gutterBottom style={{ opacity: 0.6 }}>Embed Properties</Typography>

                {Object.keys(embedProps).map((key, index) => {
                    const field = embedProps[key];

                    return <Box key={index} sx={{ width: "100%" }}>
                        <TextField
                            fullWidth value={field?.value || ""}
                            type={field?.type}
                            onChange={(e) => setEmbedProperty(key as EmbedType, e.target.value)}
                            label={field?.label}
                            InputProps={{
                                endAdornment: <Tooltip title={field?.description}>
                                    <IconButton size="small">
                                        <HelpOutlineIcon fontSize={"10px"} />
                                    </IconButton>
                                </Tooltip>
                            }} />
                    </Box>
                })}

                <Box sx={{ width: "100%" }}>
                    <TextField fullWidth value={embedStyle.width} onChange={(e) => setEmbedStyleProp("width", e.target.value)} label="Width" InputProps={{
                        endAdornment: <Tooltip title="The width of the iframe inside of which the embed will be displayed.">
                            <IconButton size="small">
                                <HelpOutlineIcon fontSize={"10px"} />
                            </IconButton>
                        </Tooltip>
                    }} />
                </Box>

                <Box sx={{ width: "100%" }}>
                    <TextField fullWidth value={embedStyle.height} onChange={(e) => setEmbedStyleProp("height", e.target.value)} label="Height" InputProps={{
                        endAdornment: <Tooltip title="The height of the iframe inside of which the embed will be displayed.">
                            <IconButton size="small">
                                <HelpOutlineIcon fontSize={"10px"} />
                            </IconButton>
                        </Tooltip>
                    }} />
                </Box>

                {/* <Box sx={{ width: "100%" }}>
                    <TextField sx={{ maxHeight: "200px" }} multiline fullWidth value={`width: 100%;\nheight: 300px;\n`} onChange={console.log} label="Inline CSS" InputProps={{
                        endAdornment: <Tooltip title="The height of the iframe inside of which the embed will be displayed.">
                            <IconButton size="small">
                                <HelpOutlineIcon fontSize={"10px"} />
                            </IconButton>
                        </Tooltip>
                    }} />
                </Box> */}
            </Stack>
            <Stack>
                <Typography fontSize={11}>Made with <Favorite sx={{ fontSize: 9, color: "#FF0000" }} /> by Mike @ Sharefox</Typography>
            </Stack>
        </Stack>
    </Container>
}

export default Sidebar;
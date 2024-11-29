import { Box, Container, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Tooltip, Typography, useTheme } from "@mui/material";
import { useRecoilState } from "recoil";
import { siteNameState, embedTypeState, embedPropsState, embedStyleState } from "../store";
import { EMBED_FIELDS, EMBED_STYLE } from "../constants";
import { EmbedType } from "../types";
import { Favorite, Help } from "@mui/icons-material";

function Sidebar() {
    const [siteName, setSiteName] = useRecoilState(siteNameState);
    const [embedType, setEmbedType] = useRecoilState(embedTypeState);

    const [embedProps, setEmbedProps] = useRecoilState(embedPropsState);
    const [embedStyle, setEmbedStyle] = useRecoilState(embedStyleState);

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

    return <Container sx={{ backgroundColor: theme.palette.background.paper, height: "100%", py: 2 }}>
        <Stack justifyContent="space-between" alignItems="center" height="100%" width="100%">
            <Stack alignItems="center" justifyContent="center" width="70%" spacing={1} pt={2}>
                <img src="https://sharefox.co/wp-content/uploads/2022/05/Sharefox_logo_dark.svg" alt="Sharefox Logo" />
                <Typography>Embed Wizard</Typography>
                </Stack>
            <Stack spacing={2} direction="column" height="100%" width="100%" alignItems="center" justifyContent="center">
                <Box width="100%" >
                    <TextField fullWidth value={siteName} onChange={(e) => setSiteName(e.target.value)} label="Site name" />
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
                                  <Help fontSize={"10px"} />
                                </IconButton>
                              </Tooltip>
                            }} />
                    </Box>
                })}         

                <Box sx={{ width: "100%" }}>
                    <TextField fullWidth value={embedStyle.width} onChange={(e) => setEmbedStyleProp("width", e.target.value)} label="Width" InputProps={{
                                endAdornment: <Tooltip title="The width of the iframe inside of which the embed will be displayed.">
                                <IconButton size="small">
                                  <Help fontSize={"10px"} />
                                </IconButton>
                              </Tooltip>
                            }} />
                </Box>

                <Box sx={{ width: "100%" }}>
                    <TextField fullWidth value={embedStyle.height} onChange={(e) => setEmbedStyleProp("height", e.target.value)} label="Height" InputProps={{
                                endAdornment: <Tooltip title="The height of the iframe inside of which the embed will be displayed.">
                                <IconButton size="small">
                                  <Help fontSize={"10px"} />
                                </IconButton>
                              </Tooltip>
                            }} />
                </Box>
            </Stack>
            <Stack>
                <Typography fontSize={10}>Made with <Favorite sx={{ fontSize: 9, color: "#FF0000" }} /> by Mike</Typography>
            </Stack>
        </Stack>
    </Container>
}

export default Sidebar;
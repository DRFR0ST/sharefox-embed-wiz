import { Box, CssBaseline, Stack, ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import { RecoilRoot } from 'recoil';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#ff1744',
    },
    background: {
      default: "#ffffff",
      paper: "#f1f0f0"
    }
  },
});

function App() {

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack direction="row" width="100vw" height="100vh">
          <Box sx={{ flex: 2, height: "100%" }}>
            <Sidebar />
          </Box>
          <Box sx={{ flex: 6, height: "100%" }}>
            <Main />
          </Box>
        </Stack>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default App
import { Box, CssBaseline, Stack, ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import { RecoilRoot } from 'recoil';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '##086b5a',
    },
    secondary: {
      main: '##4b635c',
    },
    error: {
      main: '#ff1744',
    },
    background: {
      default: "#f5fbf7",
      paper: "#e9efeb"
    }
  },
  typography: {
    fontFamily: '"Afacad Flux", sans-serif',
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

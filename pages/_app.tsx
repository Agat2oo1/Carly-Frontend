import { ThemeProvider, ThemeOptions, createTheme } from '@mui/material/styles';
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { Lato } from '@next/font/google'

const theme = createTheme({
  palette: {
    background: {
      default: '#ffffff'
    },
    primary: {
      main: '#4D7AFF',
    },
    secondary: {
      main: '#536dfe',
    },
  },
  typography: {
    fontFamily: "lato"
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ThemeProvider>
  )
}
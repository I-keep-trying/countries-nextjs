import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'
import { CountriesContextProvider } from '../libs/countries-context'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/800.css'

const theme = extendTheme({
  fonts: {
    body: 'Poppins, -apple-system',
    heading: 'Poppins, -apple-system',
  },
})

function MyApp({ Component, pageProps }) {
 // console.log('_app pageProps', pageProps) // not until a country is selected, then props of country component
 
  return (
    <ChakraProvider theme={theme}>
      <CountriesContextProvider>
        <Component {...pageProps} />
      </CountriesContextProvider>
    </ChakraProvider>
  )
}

export default MyApp

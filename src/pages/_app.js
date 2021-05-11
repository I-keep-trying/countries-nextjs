import '../styles/globals.css'
import { CountriesContextProvider } from '../libs/countries-context'

function MyApp({ Component, pageProps }) {
  return (
    <CountriesContextProvider>
      <Component {...pageProps} />
    </CountriesContextProvider>
  )
}

export default MyApp

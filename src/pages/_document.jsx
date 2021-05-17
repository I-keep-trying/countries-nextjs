import { ColorModeScript } from '@chakra-ui/react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { theme } from '../components/theme'

// IDK WTF THIS COMPONENT DOES BUT I CANNOT GET RID OF IT!!!!
// Also cannot convert it to functional component, for SOME MYSTERIOUS REASON please help me

/*  
Idk also what this was doing, but it was before `render()` 
and seems like it's not needed... idk whatever...

 static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  } */

class MyDocument extends Document {
  render() {
    return (
      <Html id="initial" lang="en">
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}


export default MyDocument

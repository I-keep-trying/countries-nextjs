import { Box } from '@chakra-ui/react'
import NextHead from 'next/head'
import Header from '../Header'

const Layout = ({ children }) => {
  return (
    <>
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      </NextHead>
      <Header />
      <Box 
      style={{ minHeight: '100vh' }} as="main">
        {children}
      </Box>
    </>
  )
}

export default Layout

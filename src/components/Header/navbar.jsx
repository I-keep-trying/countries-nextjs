import { useState, useContext } from 'react'
import { Box, useColorMode } from '@chakra-ui/react'
import DarkModeToggle from '../UI/header/darkModeToggle'
import { CountriesContext } from '../../libs/countries-context'

const Navbar = ({ colorMode }) => {
  const [state, dispatch] = useContext(CountriesContext)

  const [isOpen, setIsOpen] = useState(false)

  const { toggleColorMode } = useColorMode()

  return (
    <>
      <Box
        as="nav"
        display="flex"
        flexDir={{ base: 'row-reverse', lg: 'row' }}
        alignItems="center"
      >
      {/*   <Box
          as="ul"
          fontWeight="600"
        //  bg={{ base: 'telegram.700', lg: 'transparent' }}
          display={{
            base: isOpen ? 'block' : 'none',
            lg: 'flex',
          }}
          position={{ base: 'absolute', lg: 'static' }}
          top="5rem"
          left="5%"
          right="5%"
          rounded={{ base: 'lg', lg: 'none' }}
          py={{ base: '2', lg: '0' }}
          px={{ base: '4', lg: '0' }}
          alignItems={{ lg: 'center' }}
          boxShadow={{ base: 'xl', lg: 'none' }}
          zIndex="2"
        >
          {JSON.stringify(colorMode)}
        </Box> */}
        <DarkModeToggle onClick={toggleColorMode} colorMode={colorMode} />
      </Box>
    </>
  )
}

export default Navbar

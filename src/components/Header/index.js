import { useState, useContext } from 'react'
import { VStack, Box, useColorMode, Heading, Button } from '@chakra-ui/react'
import DarkModeToggle from '../UI/header/darkModeToggle'
import NextLink from 'next/link'
import { CountriesContext } from '../../libs/countries-context'
import SearchInput from '../SearchInput/SearchInput'

const Header = () => {
  const [state, dispatch] = useContext(CountriesContext)
  const [keyword, setKeyword] = useState('')

  const onInputChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
    dispatch({
      type: 'FIND_COUNTRY',
      payload: e.target.value.toLowerCase(),
    })
  }

  const { toggleColorMode, colorMode } = useColorMode()

  const handleUnitButtonClick = (u) => {
    dispatch({
      type: 'SET_UNIT',
      payload: u,
    })
  }

  return (
    <>
      <VStack>
        <Box
          style={{ position: 'fixed', top: 0, width: '100%', zIndex: 99 }}
          as="header"
          bg={colorMode === 'light' ? 'gray.700' : 'gray.400'}
          color={colorMode === 'light' ? 'white' : 'black'}
          fontSize="18px"
        >
          <Box
          style={{paddingLeft: 10}}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={[4, 6, 10, 14, 20]}
            maxW="1440px"
            mx="auto"
            h="4rem"
          >
            <NextLink href="/">
              <Heading as="h3" size="lg" style={{ cursor: 'pointer' }}>
                World Almanac
              </Heading>
            </NextLink>
            <Button
              aria-label="change unit"
              onClick={() =>
                handleUnitButtonClick(
                  state.unit === 'imperial' ? 'metric' : 'imperial'
                )
              }
            >
              uom: {state.unit}
            </Button>
            <SearchInput onChange={onInputChange} />
            <DarkModeToggle onClick={toggleColorMode} colorMode={colorMode} />
          </Box>
        </Box>
        {/* <Box
        style={{ position: 'fixed', top: 50, width: '100%', zIndex: 99 }}
        as="header"
        bg={colorMode === 'light' ? 'gray.700' : 'gray.400'}
        color={colorMode === 'light' ? 'white' : 'black'}
        fontSize="18px"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={[4, 6, 10, 14, 20]}
          maxW="1440px"
          mx="auto"
          h="4rem"
        >
          <NextLink href="/">
            <Heading style={{ cursor: 'pointer' }}>World Almanac</Heading>
          </NextLink>
          <Button aria-label='change unit' onClick={() => handleUnitButtonClick(state.unit === 'imperial' ? 'metric' : 'imperial')}>
           uom: {state.unit}
          </Button>


          <DarkModeToggle onClick={toggleColorMode} colorMode={colorMode} />
        </Box>
      </Box> */}
      </VStack>
      {/* <Box
        style={{ position: 'fixed', top: 0, width: '100%', zIndex: 99 }}
        as="header"
        bg={colorMode === 'light' ? 'gray.700' : 'gray.400'}
        color={colorMode === 'light' ? 'white' : 'black'}
        fontSize="18px"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={[4, 6, 10, 14, 20]}
          maxW="1440px"
          mx="auto"
          h="4rem"
        >
          <NextLink href="/">
            <Heading style={{ cursor: 'pointer' }}>World Almanac</Heading>
          </NextLink>
          <Button aria-label='change unit' onClick={() => handleUnitButtonClick(state.unit === 'imperial' ? 'metric' : 'imperial')}>
           uom: {state.unit}
          </Button>


          <DarkModeToggle onClick={toggleColorMode} colorMode={colorMode} />
        </Box>
      </Box> */}
    </>
  )
}

export default Header

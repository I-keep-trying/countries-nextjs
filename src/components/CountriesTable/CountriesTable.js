import Link from 'next/link'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
  Text,
  Stack,
  HStack,
  VStack,
  Flex,
  Image,
} from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useState, useContext } from 'react'
import { CountriesContext } from '../../libs/countries-context'

import { nanoid } from 'nanoid'

const orderBy = (countries, value, direction) => {
  return direction === 'asc'
    ? [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1))
    : [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1))
}

const SortArrow = ({ direction }) => {
  return direction === 'desc' ? <TriangleDownIcon /> : <TriangleUpIcon />
}

const CountriesTable = ({ countries }) => {
  const [state, dispatch] = useContext(CountriesContext)
  const [direction, setDirection] = useState('asc')
  const [value, setValue] = useState('name')

  const orderedCountries = orderBy(countries, value, direction)

  const switchDirection = () =>
    direction === 'desc' ? setDirection('asc') : setDirection('desc')

  const setValueAndDirection = (value) => {
    switchDirection()
    setValue(value)
  }

  const unitConvert = (val) => {
    return Math.round(val * 0.6214).toLocaleString()
  }

  const countriesLabel = state.countries.length === 1 ? 'country' : 'countries'

  return (
    <VStack style={{ paddingTop: 80 }}>
      <Text style={{ paddingBottom: 20 }}>
        Found {state.countries.length} {countriesLabel}
      </Text>
     
      <Table size="sm">
        <Thead>
          <Tr>
            <Th></Th>
            <Th
              style={{ cursor: 'pointer' }}
              onClick={() => setValueAndDirection('name')}
            >
              Name {value === 'name' && <SortArrow direction={direction} />}
            </Th>
            <Th
              style={{ cursor: 'pointer' }}
              onClick={() => setValueAndDirection('population')}
            >
              Population
              {value === 'population' && <SortArrow direction={direction} />}
            </Th>
            <Th
              style={{ cursor: 'pointer' }}
              onClick={() => setValueAndDirection('area')}
            >
              Area ({state.unit === 'metric' ? 'km' : 'mi'}
              <sup style={{ fontSize: '0.5rem' }}>2</sup>)
              {value === 'area' && <SortArrow direction={direction} />}
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {orderedCountries.map((country) => (
            <Link href={`/country/${country.alpha3Code}`} key={country.name}>
              <Tr key={country.id}>
                <Td>
                  <Image
                    boxSize="50px"
                    objectFit="contain"
                    src={country.flag}
                  />{' '}
                </Td>
                <Td>{country.name}</Td>
                <Td>{country.population.toLocaleString() || `No Data`}</Td>
                <Td>
                  {country.area === null
                    ? 'No data'
                    : state.unit === 'metric'
                    ? country.area.toLocaleString()
                    : unitConvert(country.area)}
                </Td>
              </Tr>
            </Link>
          ))}
        </Tbody>
      </Table>
    </VStack>
  )
}

export default CountriesTable

/*  
  In case initial data needs re-configured

   const countries2 = countries.map((country) => {
    return new Object({
      id: nanoid(),
      name: country.name,
      capital: country.capital,
      region: country.region,
      subregion: country.subregion,
      flag: country.flag,
      population: country.population,
      area: country.area,
      alpha3Code: country.alpha3Code,
    })
  }) */

import Link from 'next/link'
import { useState, useContext } from 'react'
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
import { CountriesContext } from '../../libs/countries-context'

const orderBy = (countries, value, direction) => {
  return direction === 'asc'
    ? [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1))
    : [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1))
}

const SortArrow = ({ direction }) => {
  return direction === 'desc' ? <TriangleDownIcon /> : <TriangleUpIcon />
}

const DataTabs = () => {
  const [state, dispatch] = useContext(CountriesContext)
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [direction, setDirection] = useState('asc')
  const [value, setValue] = useState('name')
  const [countriesCount, setCountriesCount] = useState(0)
  const orderedCountries = orderBy(state.countries, value, direction)

  const switchDirection = () =>
    direction === 'desc' ? setDirection('asc') : setDirection('desc')

  const setValueAndDirection = (value) => {
    switchDirection()
    setValue(value)
  }

  const unitConvert = (val) => {
    return Math.round(val * 0.6214).toLocaleString()
  }

  const countriesLabel = countriesCount === 1 ? 'country' : 'countries'

  const selectRegion = (id) => {
    if (id === 'All') {
      dispatch({
        type: 'SELECT_REGION',
        payload: 'All',
      })
    }
    dispatch({
      type: 'SELECT_REGION',
      payload: id,
    })
  }

  const regions = state.regions.map((r) => {
    return <Tab key={r.id}>{r.region}</Tab>
  })

  const rows = state.regions.map((region) => {
    const countries = orderedCountries.filter((country) =>
      region.region === 'All' ? country : country.region === region.region
    )
    return (
      <TabPanel key={region.id}>
        <Table variant="simple">
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
        </Table>
        {countries.map((country) => {
          return (
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
          )
        })}
      </TabPanel>
    )
  })

  return (
    <VStack style={{ paddingTop: 80 }}>
      <Text style={{ paddingBottom: 20 }}>
        Found {countriesCount} {countriesLabel}
      </Text>
      <Tabs>
        <TabList>{regions}</TabList>
        <TabPanels>{rows}</TabPanels>
      </Tabs>
    </VStack>
  )
}

export default DataTabs

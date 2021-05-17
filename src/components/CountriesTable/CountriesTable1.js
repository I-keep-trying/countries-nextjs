import Link from 'next/link'
import {
  Box,
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

  /////////////////////////////////////////////////////
  /* Tabs Example */
  const [tabIndex, setTabIndex] = useState(0)
  const [selectedRegion, setSelectedRegion] = useState('All')

  const handleTabsChange = (index) => {
    setTabIndex(index)
  }

  /* End Tabs Example */
  //////////////////////////////////////////////////////////////

  const handleClick = (e) => {
    setSelectedRegion(e.target.value)
  }

  const regionsTabs = state.regions.map((r) => {
    return (
      <Tab onClick={(e) => handleClick(e)} value={r.region} key={r.id}>
        {r.region}
      </Tab>
    )
  })

  // 'tabPanels' does not work
  const tabPanels = orderedCountries.map((country) => (
    <TabPanel>{country.name}</TabPanel>
  ))

  return (
    <Box style={{ marginTop: 100 }}>
      <div>{JSON.stringify(selectedRegion)}</div>
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList>{regionsTabs}</TabList>
        <TabPanels>
          <TabPanel>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th
                    style={{ cursor: 'pointer' }}
                    onClick={() => setValueAndDirection('name')}
                  >
                    Name{' '}
                    {value === 'name' && <SortArrow direction={direction} />}
                  </Th>
                  <Th
                    style={{ cursor: 'pointer' }}
                    onClick={() => setValueAndDirection('population')}
                  >
                    Population
                    {value === 'population' && (
                      <SortArrow direction={direction} />
                    )}
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
                  <Link
                    href={`/country/${country.alpha3Code}`}
                    key={country.name}
                  >
                    <Tr key={country.id}>
                      <Td>
                        <Image
                          boxSize="50px"
                          objectFit="contain"
                          src={country.flag}
                        />{' '}
                      </Td>
                      <Td>{country.name}</Td>
                      <Td>
                        {country.population.toLocaleString() || `No Data`}
                      </Td>
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
          </TabPanel>
          {/*  <TabPanel>
          {orderedCountries.map((country) => country.name)}
          </TabPanel> */}
          <TabPanel>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th
                    style={{ cursor: 'pointer' }}
                    onClick={() => setValueAndDirection('name')}
                  >
                    Name{' '}
                    {value === 'name' && <SortArrow direction={direction} />}
                  </Th>
                  <Th>Region</Th>
                  <Th
                    style={{ cursor: 'pointer' }}
                    onClick={() => setValueAndDirection('population')}
                  >
                    Population
                    {value === 'population' && (
                      <SortArrow direction={direction} />
                    )}
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
                {orderedCountries.map((country) =>
                  country.region === selectedRegion ? (
                    <Link
                      href={`/country/${country.alpha3Code}`}
                      key={country.name}
                    >
                      <Tr key={country.id}>
                        <Td>
                          <Image
                            boxSize="50px"
                            objectFit="contain"
                            src={country.flag}
                          />{' '}
                        </Td>
                        <Td>{country.name}</Td>
                        <Td>{country.region}</Td>
                        <Td>
                          {country.population.toLocaleString() || `No Data`}
                        </Td>
                        <Td>
                          {country.area === null
                            ? 'No data'
                            : state.unit === 'metric'
                            ? country.area.toLocaleString()
                            : unitConvert(country.area)}
                        </Td>
                      </Tr>
                    </Link>
                  ) : (
                    <></>
                  )
                )}
              </Tbody>
            </Table>
          </TabPanel>
          {/*  <TabPanel>
            {orderedCountries.map((country) =>
              country.region === selectedRegion ? country.name : ''
            )}
          </TabPanel> */}
          <TabPanel>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th
                    style={{ cursor: 'pointer' }}
                    onClick={() => setValueAndDirection('name')}
                  >
                    Name{' '}
                    {value === 'name' && <SortArrow direction={direction} />}
                  </Th>
                  <Th>Region</Th>
                  <Th
                    style={{ cursor: 'pointer' }}
                    onClick={() => setValueAndDirection('population')}
                  >
                    Population
                    {value === 'population' && (
                      <SortArrow direction={direction} />
                    )}
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
                {orderedCountries.map((country) =>
                  country.region === selectedRegion ? (
                    <Link
                      href={`/country/${country.alpha3Code}`}
                      key={country.name}
                    >
                      <Tr key={country.id}>
                        <Td>
                          <Image
                            boxSize="50px"
                            objectFit="contain"
                            src={country.flag}
                          />{' '}
                        </Td>
                        <Td>{country.name}</Td>
                        <Td>{country.region}</Td>
                        <Td>
                          {country.population.toLocaleString() || `No Data`}
                        </Td>
                        <Td>
                          {country.area === null
                            ? 'No data'
                            : state.unit === 'metric'
                            ? country.area.toLocaleString()
                            : unitConvert(country.area)}
                        </Td>
                      </Tr>
                    </Link>
                  ) : (
                    <></>
                  )
                )}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th
                    style={{ cursor: 'pointer' }}
                    onClick={() => setValueAndDirection('name')}
                  >
                    Name{' '}
                    {value === 'name' && <SortArrow direction={direction} />}
                  </Th>
                  <Th>Region</Th>
                  <Th
                    style={{ cursor: 'pointer' }}
                    onClick={() => setValueAndDirection('population')}
                  >
                    Population
                    {value === 'population' && (
                      <SortArrow direction={direction} />
                    )}
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
                {orderedCountries.map((country) =>
                  country.region === selectedRegion ? (
                    <Link
                      href={`/country/${country.alpha3Code}`}
                      key={country.name}
                    >
                      <Tr key={country.id}>
                        <Td>
                          <Image
                            boxSize="50px"
                            objectFit="contain"
                            src={country.flag}
                          />{' '}
                        </Td>
                        <Td>{country.name}</Td>
                        <Td>{country.region}</Td>
                        <Td>
                          {country.population.toLocaleString() || `No Data`}
                        </Td>
                        <Td>
                          {country.area === null
                            ? 'No data'
                            : state.unit === 'metric'
                            ? country.area.toLocaleString()
                            : unitConvert(country.area)}
                        </Td>
                      </Tr>
                    </Link>
                  ) : (
                    <></>
                  )
                )}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th
                    style={{ cursor: 'pointer' }}
                    onClick={() => setValueAndDirection('name')}
                  >
                    Name{' '}
                    {value === 'name' && <SortArrow direction={direction} />}
                  </Th>
                  <Th>Region</Th>
                  <Th
                    style={{ cursor: 'pointer' }}
                    onClick={() => setValueAndDirection('population')}
                  >
                    Population
                    {value === 'population' && (
                      <SortArrow direction={direction} />
                    )}
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
                {orderedCountries.map((country) =>
                  country.region === selectedRegion ? (
                    <Link
                      href={`/country/${country.alpha3Code}`}
                      key={country.name}
                    >
                      <Tr key={country.id}>
                        <Td>
                          <Image
                            boxSize="50px"
                            objectFit="contain"
                            src={country.flag}
                          />{' '}
                        </Td>
                        <Td>{country.name}</Td>
                        <Td>{country.region}</Td>
                        <Td>
                          {country.population.toLocaleString() || `No Data`}
                        </Td>
                        <Td>
                          {country.area === null
                            ? 'No data'
                            : state.unit === 'metric'
                            ? country.area.toLocaleString()
                            : unitConvert(country.area)}
                        </Td>
                      </Tr>
                    </Link>
                  ) : (
                    <></>
                  )
                )}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th
                    style={{ cursor: 'pointer' }}
                    onClick={() => setValueAndDirection('name')}
                  >
                    Name{' '}
                    {value === 'name' && <SortArrow direction={direction} />}
                  </Th>
                  <Th>Region</Th>
                  <Th
                    style={{ cursor: 'pointer' }}
                    onClick={() => setValueAndDirection('population')}
                  >
                    Population
                    {value === 'population' && (
                      <SortArrow direction={direction} />
                    )}
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
                {orderedCountries.map((country) =>
                  country.region === selectedRegion ? (
                    <Link
                      href={`/country/${country.alpha3Code}`}
                      key={country.name}
                    >
                      <Tr key={country.id}>
                        <Td>
                          <Image
                            boxSize="50px"
                            objectFit="contain"
                            src={country.flag}
                          />{' '}
                        </Td>
                        <Td>{country.name}</Td>
                        <Td>{country.region}</Td>
                        <Td>
                          {country.population.toLocaleString() || `No Data`}
                        </Td>
                        <Td>
                          {country.area === null
                            ? 'No data'
                            : state.unit === 'metric'
                            ? country.area.toLocaleString()
                            : unitConvert(country.area)}
                        </Td>
                      </Tr>
                    </Link>
                  ) : (
                    <></>
                  )
                )}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th
                    style={{ cursor: 'pointer' }}
                    onClick={() => setValueAndDirection('name')}
                  >
                    Name{' '}
                    {value === 'name' && <SortArrow direction={direction} />}
                  </Th>
                  <Th>Region</Th>
                  <Th
                    style={{ cursor: 'pointer' }}
                    onClick={() => setValueAndDirection('population')}
                  >
                    Population
                    {value === 'population' && (
                      <SortArrow direction={direction} />
                    )}
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
                {orderedCountries.map((country) =>
                  country.region === selectedRegion ? (
                    <Link
                      href={`/country/${country.alpha3Code}`}
                      key={country.name}
                    >
                      <Tr key={country.id}>
                        <Td>
                          <Image
                            boxSize="50px"
                            objectFit="contain"
                            src={country.flag}
                          />{' '}
                        </Td>
                        <Td>{country.name}</Td>
                        <Td>{country.region}</Td>
                        <Td>
                          {country.population.toLocaleString() || `No Data`}
                        </Td>
                        <Td>
                          {country.area === null
                            ? 'No data'
                            : state.unit === 'metric'
                            ? country.area.toLocaleString()
                            : unitConvert(country.area)}
                        </Td>
                      </Tr>
                    </Link>
                  ) : (
                    <></>
                  )
                )}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th
                    style={{ cursor: 'pointer' }}
                    onClick={() => setValueAndDirection('name')}
                  >
                    Name{' '}
                    {value === 'name' && <SortArrow direction={direction} />}
                  </Th>
                  <Th>Region</Th>
                  <Th
                    style={{ cursor: 'pointer' }}
                    onClick={() => setValueAndDirection('population')}
                  >
                    Population
                    {value === 'population' && (
                      <SortArrow direction={direction} />
                    )}
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
                {orderedCountries.map((country) =>
                  country.region === '' ? (
                    <Link
                      href={`/country/${country.alpha3Code}`}
                      key={country.name}
                    >
                      <Tr key={country.id}>
                        <Td>
                          <Image
                            boxSize="50px"
                            objectFit="contain"
                            src={country.flag}
                          />{' '}
                        </Td>
                        <Td>{country.name}</Td>
                        <Td>{country.region}</Td>
                        <Td>
                          {country.population.toLocaleString() || `No Data`}
                        </Td>
                        <Td>
                          {country.area === null
                            ? 'No data'
                            : state.unit === 'metric'
                            ? country.area.toLocaleString()
                            : unitConvert(country.area)}
                        </Td>
                      </Tr>
                    </Link>
                  ) : (
                    <></>
                  )
                )}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
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

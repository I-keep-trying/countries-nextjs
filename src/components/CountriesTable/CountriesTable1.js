import Link from 'next/link'
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@material-ui/icons'
import { useState, useContext } from 'react'
import styles from './CountriesTable.module.css'
import { CountriesContext } from '../../libs/countries-context'

import { nanoid } from 'nanoid'

const orderBy = (countries, value, direction) => {
  return direction === 'asc'
    ? [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1))
    : [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1))
}

const SortArrow = ({ direction }) => {
  return direction === 'desc' ? (
    <div className={styles.heading_arrow}>
      <KeyboardArrowDownRounded color="inherit" />
    </div>
  ) : (
    <div className={styles.heading_arrow}>
      <KeyboardArrowUpRounded color="inherit" />
    </div>
  )
}

const CountriesTable = ({ countries }) => {
  const [state, dispatch] = useContext(CountriesContext)
  const [direction, setDirection] = useState('asc')
  const [value, setValue] = useState('name')
  console.log('CountriesTable countries', countries[0])
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
  })
  return (
    <div>
      <div id="country-heading" className={styles.heading}>
        <div className={styles.heading_flag}></div>

        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection('name')}
        >
          <div>Name</div>

          {value === 'name' && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection('population')}
        >
          <div>Population</div>

          {value === 'population' && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection('area')}
        >
          <div>
            Area ({state.unit === 'metric' ? 'km' : 'mi'}
            <sup style={{ fontSize: '0.5rem' }}>2</sup>)
          </div>

          {value === 'area' && <SortArrow direction={direction} />}
        </button>
      </div>
      {orderedCountries.map((country) => {
        //  console.log('country', country[0])
        /*  return (
          <div className={styles.row}>
            <div className={styles.flag}>
              <img src={country.flag} alt={country.name} />
            </div>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>
              {country.population === 0
                ? 'No Data'
                : country.population.toLocaleString()}
            </div>

            <div className={styles.area}>
              {country.area === null
                ? 'No data'
                : state.unit === 'metric'
                ? country.area.toLocaleString()
                : unitConvert(country.area)}
            </div>
          </div>
        ) */

        return (
          <Link href={`/country/${country.alpha3Code}`} key={country.name}>
            {JSON.stringify(country.alpha3Code)}
            <div className={styles.row}>
              <div className={styles.flag}>
                <img src={country.flag} alt={country.name} />
              </div>
              <div className={styles.name}>{country.name}</div>
              <div className={styles.population}>
                {country.population === 0
                  ? 'No Data'
                  : country.population.toLocaleString()}
              </div>

              <div className={styles.area}>
                {country.area === null
                  ? 'No data'
                  : state.unit === 'metric'
                  ? country.area.toLocaleString()
                  : unitConvert(country.area)}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default CountriesTable

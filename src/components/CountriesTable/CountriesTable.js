import Link from 'next/link'
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@material-ui/icons'
import { useState, useContext } from 'react'
import styles from './CountriesTable.module.css'
import { CountriesContext } from '../../libs/countries-context'

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

// At this point, {countries} is pulled from context state, from Home component

const CountriesTable = ({countries}) => {
  const [state, dispatch] = useContext(CountriesContext)
  const [direction, setDirection] = useState()
  const [value, setValue] = useState()
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

  return (
    <div>
      <div className={styles.heading}>
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

        {/*  <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection('gini')}
        >
          <div>Gini</div>

          {value === 'gini' && <SortArrow direction={direction} />}
        </button> */}
      </div>
      {orderedCountries.map((country) => (
        <Link href={`/country/${country.alpha3Code}`} key={country.name}>
          <div className={styles.row}>
            <div className={styles.flag}>
              <img src={country.flag} alt={country.name} />
            </div>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>
              {country.population.toLocaleString() || `No Data`}
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
      ))}
    </div>
  )
}

export default CountriesTable

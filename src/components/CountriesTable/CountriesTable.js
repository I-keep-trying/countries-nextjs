import Link from 'next/link'
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@material-ui/icons'
import { useState } from 'react'
import styles from './CountriesTable.module.css'

const orderBy = (countries, value, direction) => {
  if (direction === 'asc') {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1))
  } else {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1))
  }

  return countries
}

const SortArrow = ({ direction }) => {
  if (direction === 'desc') {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    )
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    )
  }
}

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState('asc')
  const [value, setValue] = useState('name')

  const orderedCountries = orderBy(countries, value, direction)

  const switchDirection = () =>
    direction === 'desc' ? setDirection('asc') : setDirection('desc')

  const setValueAndDirection = (value) => {
    switchDirection()
    setValue(value)
  }

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
            Area (km<sup style={{ fontSize: '0.5rem' }}>2</sup>)
          </div>

          {value === 'area' && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection('gini')}
        >
          <div>Gini</div>

          {value === 'gini' && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedCountries.map((country) => (
        <Link href={`/country/${country.alpha3Code}`} key={country.name}>
          <div className={styles.row}>
            <div className={styles.flag}>
              <img src={country.flag} alt={country.name} />
            </div>
            <div className={styles.name}>{country.name}</div>

            <div className={styles.population}>{country.population}</div>

            <div className={styles.area}>{country.area || 0}</div>

            <div className={styles.gini}>{country.gini || 0} %</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CountriesTable

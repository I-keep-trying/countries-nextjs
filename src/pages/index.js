import Head from 'next/head'
import { useState, useContext } from 'react'
import CountriesTable from '../components/CountriesTable/CountriesTable'
import Layout from '../components/Layout/Layout'
import SearchInput from '../components/SearchInput/SearchInput'
import styles from '../styles/Home.module.css'
import countries from '../countriesList'
import { CountriesContext } from '../libs/countries-context'

export default function Home() {
  const [state, dispatch] = useContext(CountriesContext)
  const [keyword, setKeyword] = useState('')

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().startsWith(keyword)
  )

  const onInputChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }

  const handleUnitButtonClick = (u) => {
    dispatch({
      type: 'SET_UNIT',
      payload: u,
    })
  }

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>
          {filteredCountries.length === 1 ? (
            <>Found {filteredCountries.length} country </>
          ) : (
            <>Found {filteredCountries.length} countries</>
          )}
        </div>

        <div className={styles.input}>
          <SearchInput
            placeholder="Start typing country name..."
            onChange={onInputChange}
          />
        </div>
        <div className={styles.units}>
          Set Unit:{' '}
          <span
            className={styles.unit}
            onClick={() => handleUnitButtonClick('imperial')}
          >
            F
          </span>{' '}
          <span
            className={styles.unit}
            onClick={() => handleUnitButtonClick('metric')}
          >
            M
          </span>{' '}
        </div>
      </div>
      <CountriesTable countries={filteredCountries} />
    </Layout>
  )
}

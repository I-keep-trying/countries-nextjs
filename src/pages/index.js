import Head from 'next/head'
import { useState } from 'react'
import CountriesTable from '../components/CountriesTable/CountriesTable'
import Layout from '../components/Layout/Layout'
import SearchInput from '../components/SearchInput/SearchInput'
import styles from '../styles/Home.module.css'
import countries from '../countriesList'
import { nanoid } from 'nanoid'

export default function Home() {
 // console.log('countries from Home comp', countries[0])
  const [keyword, setKeyword] = useState('')

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().startsWith(keyword)
  )

  const onInputChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
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
      </div>
      <CountriesTable countries={filteredCountries} />
    </Layout>
  )
}

/* export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all')
  const countries = await res.json()

  return {
    props: {
      countries,
    },
  }
} */

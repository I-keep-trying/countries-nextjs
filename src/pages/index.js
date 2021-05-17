import Head from 'next/head'
import { useState, useContext } from 'react'
import CountriesTable from '../components/CountriesTable/CountriesTable1'
import Layout from '../components/Layout/Layout'
import SearchInput from '../components/SearchInput/SearchInput'
import { CountriesContext } from '../libs/countries-context'

export default function Home() {
  const [state, dispatch] = useContext(CountriesContext)

  return (
    <Layout>
      <CountriesTable countries={state.countries} />
    </Layout>
  )
}

// getStaticProps is not needed unless local json (from 'countriesList' in countries=context) is not appropriate for initial state

/* export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all')
  const countries = await res.json()

  return {
    props: {
      countries,
    },
  }
} */

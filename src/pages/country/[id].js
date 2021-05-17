import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'
import Layout from '../../components/Layout/Layout'
import styles from './Country.module.css'
import countries from '../../countriesList'
import axios from 'axios'
import { CountriesContext } from '../../libs/countries-context'

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)
  const country = await res.json()

  return country
}

/* const getCoords = async (country) => {
  const res = await axios
    .get(
      `https://geocode.search.hereapi.com/v1/geocode?q=${country.capital},${country.name}&apiKey=${process.env.NEXT_PUBLIC_HERE_KEY}`
    )
    .then((res) => console.log('res', res))
} */
const Country = ({ country }) => {
  const [state, dispatch] = useContext(CountriesContext)
  const [borders, setBorders] = useState([])
  const [location, setLocation] = useState({})
  const [loading, setLoading] = useState(true)

  const getBorders = async () => {
    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    )
    setBorders(borders)
  }

  useEffect(() => {
    getBorders()
  }, [])

  useEffect(() => {
    // Get location coords of country capital, to use for weather
    axios
      .get(
        `https://geocode.search.hereapi.com/v1/geocode?q=${country.capital},${country.name}&apiKey=${process.env.NEXT_PUBLIC_HERE_KEY}`
      )
      .then((res) => setLocation(res.data.items[0].position))
  }, [])
  //console.log('location', location.lat)

  useEffect(() => {
    if (location.lat !== undefined) {
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&exclude=minutely,hourly&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_KEY}&units=${state.unit}`
      axios.get(url).then((response) => {
        dispatch({
          type: 'SET_WEATHER',
          payload: response.data,
        })
        setLoading(false)
      })
    }
  }, [state.unit])
  // console.log('state.weather', state.weather)

  return (
    <Layout title={country.name}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview_panel}>
            <img src={country.flag} alt={country.name}></img>

            <h1 className={styles.overview_name}>{country.name}</h1>
            <div className={styles.overview_region}>{country.region}</div>

            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {country.population}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>

              <div className={styles.overview_area}>
                <div className={styles.overview_value}>{country.area}</div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {country.capital}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Languages</div>
              <div className={styles.details_panel_value}>
                {country.languages.map(({ name }) => name).join(', ')}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currencies</div>
              <div className={styles.details_panel_value}>
                {country.currencies.map(({ name }) => name).join(', ')}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native name</div>
              <div className={styles.details_panel_value}>
                {country.nativeName}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Gini</div>
              <div className={styles.details_panel_value}>{country.gini} %</div>
            </div>

            <div className={styles.details_panel_borders}>
              <div className={styles.details_panel_borders_label}>
                Neighbouring Countries
              </div>

              <div className={styles.details_panel_borders_container}>
                {borders.map(({ flag, name, alpha3Code }) => (
                  <div className={styles.details_panel_borders_country}>
                    <Link href={`/country/${alpha3Code}`}>
                      <img
                        className={styles.details_panel_borders_flag}
                        src={flag}
                        alt={name}
                      ></img>
                    </Link>
                    <div className={styles.details_panel_borders_name}>
                      {name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Country

export const getStaticPaths = async () => {
  // fetch not needed here unless local json from context needs to be replaced with current data
  /* 
  const res = await fetch('https://restcountries.eu/rest/v2/all')
  const countries = await res.json()
   */
  const paths = countries.map((country) => {
    return {
      params: {
        id: country.alpha3Code,
        capital: country.capital,
        name: country.name,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const country = await getCountry(params.id)
  // console.log('params', params)

  return {
    props: {
      country,
    },
  }
}

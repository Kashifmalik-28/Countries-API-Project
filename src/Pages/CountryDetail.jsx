import { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom' // ← Import useParams and Link
import './CountryDetail.css'
import { useTheme } from '../hooks/UseTheme'
import CountryDetailShimmer from './CountryDetailShimmer'

const CountryDetail = () => {
  const { countryName } = useParams() // ← Get countryName from URL

  const [countryData, setCountryData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isDark } = useTheme()

  useEffect(() => {
    setLoading(true)
    fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=name,capital,population,flags,region,cca3,borders,languages,currencies,subregion,area,tld`
    )
      .then((res) => {
        if (!res.ok) throw new Error('Country not found')
        return res.json()
      })
      .then(([data]) => {
        // console.log(data) // Check what data you're getting

        setCountryData({
          name: data.name.common,
          nativeName:
            Object.values(data.name.nativeName || {})[0]?.common ||
            data.name.common,
          population: data.population,
          region: data.region,
          subregion: data.subregion,
          capital: data.capital,
          flag: data.flags.svg,
          languages: Object.values(data.languages || {}).join(', '),
          tld: data.tld?.join(', ') || 'N/A',
          currencies: Object.values(data.currencies || {})
            .map((currency) => currency.name)
            .join(', '),
          borders: data.borders || [],
        })

        if (!data.borders) {
          data.borders = []
        }

        Promise.all(
          data.borders.map((border) => {
            return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
              .then((res) => res.json())
              .then(([borderCountry]) => borderCountry.name.common)
          })
        ).then((borders) => {
          setCountryData((prevState) => ({ ...prevState, borders }))
        })

        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [countryName]) // ← Run when countryName changes

  if (error) return <div>Error: {error}</div>

  return (
    <main className={`${isDark ? 'dark' : ''}`}>
      {countryData === null ? (
        <CountryDetailShimmer />
      ) : (
        <div className="country-details-container">
          <Link to="/" className="back-button">
            <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
          </Link>
          <div className="country-details">
            <img src={countryData.flag} alt={`${countryData.name} flag`} />
            <div className="details-text-container">
              <h1>{countryData.name}</h1>
              <div className="details-text">
                <p>
                  <b>Native Name: </b>
                  {countryData.nativeName}
                </p>
                <p>
                  <b>Population: </b>
                  {countryData.population.toLocaleString('en-IN')}
                </p>
                <p>
                  <b>Region: </b>
                  {countryData.region}
                </p>
                <p>
                  <b>Sub Region: </b>
                  {countryData.subregion}
                </p>
                <p>
                  <b>Capital: </b>
                  {countryData.capital?.join(', ')}
                </p>
                <p>
                  <b>Top Level Domain: </b>
                  {countryData.tld}
                </p>
                <p>
                  <b>Currencies: </b>
                  {countryData.currencies}
                </p>
                <p>
                  <b>Languages: </b>
                  {countryData.languages}
                </p>
              </div>
              {countryData.borders && countryData.borders.length > 0 && (
                <div className="border-countries">
                  <b>Border Countries: </b>
                  {countryData.borders.map((borderName, index) => (
                    <Link key={index} to={`/${borderName}`}>
                      {borderName}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default CountryDetail

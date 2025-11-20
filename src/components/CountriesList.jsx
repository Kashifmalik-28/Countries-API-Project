import { useEffect, useState } from 'react'
// import CountriesData from '../../CountriesData'
import CountryCard from './CountryCard'
import CountriesListShimmer from './CountriesListShimmer'
import { useOutletContext } from 'react-router'

const CountriesList = ({ query }) => {
  const [countriesData, setCountriesData] = useState([])

  useEffect(() => {
    fetch(
      'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,region,cca3'
    )
      .then((res) => res.json())
      .then((data) => {
        return setCountriesData(data)
      })
  }, [])

  return (
    <>
      {!countriesData.length ? (
        <CountriesListShimmer />
      ) : (
        <div className="countries-container">
          {countriesData
            .filter(
              (country) =>
                country.name.common.toLowerCase().includes(query) ||
                country.region.toLowerCase().includes(query)
            )
            .map((country) => {
              return (
                <CountryCard
                  key={country.name.common}
                  name={country.name.common}
                  flag={country.flags.svg}
                  population={country.population}
                  region={country.region}
                  capital={country.capital?.[0] || 'No Capital'}
                />
              )
            })}
        </div>
      )}
    </>
  )
}

export default CountriesList

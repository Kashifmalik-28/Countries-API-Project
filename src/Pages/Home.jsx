import { useState } from 'react'
import CountriesList from '../components/CountriesList'
import SearchBar from '../components/SearchBar'
import SelectMenu from '../components/SelectMenu'
import { useTheme } from '../hooks/UseTheme'

const Home = () => {
  const [query, setQuery] = useState('')
  const { isDark } = useTheme()
  return (
    <>
      <main className={`${isDark ? 'dark' : ''}`}>
        <div className="search-filter-container">
          <SearchBar setQuery={setQuery} />
          <SelectMenu setQuery={setQuery} />
        </div>
        <CountriesList query={query} />
      </main>
    </>
  )
}

export default Home

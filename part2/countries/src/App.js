import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CountriesList from './components/CountriesList'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = e => {
    setFilter(e.target.value)
  }

  const clickShowHandle = name => {
    setFilter(name)
  }

  const countriesToShow =
    filter === '' ? [] : countries.filter(country => country.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <CountriesList countries={countriesToShow} clickShowHandle={clickShowHandle} />
    </div>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const Country = ({ country }) => {
  const [temp, setTemp] = useState(null)

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
      .then(response => {
        console.log(response)
        setTemp(response.data.current)
      })
  }, [country])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(lang => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="flag" />
      <h3>Weather in {country.capital}</h3>
      <Weather temp={temp} />
    </div>
  )
}

export default Country

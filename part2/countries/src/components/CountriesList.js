import Country from './Country'

const CountriesList = ({ countries, clickShowHandle }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length > 1) {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.name}>
            {country.name}
            <button onClick={() => clickShowHandle(country.name)}>show</button>
          </li>
        ))}
      </ul>
    )
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />
  }
  return ''
}

export default CountriesList

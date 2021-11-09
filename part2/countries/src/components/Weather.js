const Weather = ({ temp }) => {
  if (temp) {
    return (
      <div>
        <p>
          <strong>temperature: </strong>
          {temp.temperature} Celsius
        </p>
        <img src={temp['weather_icons'][0]} alt="weather icon" />
        <p>
          <strong>wind: </strong>
          {temp.wind_speed} mph direction {temp.wind_dir}
        </p>
      </div>
    )
  }
  return <p>Weather not available</p>
}

export default Weather

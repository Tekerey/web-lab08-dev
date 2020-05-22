import React from 'react';
import './Weather.css';

class WeatherDay extends React.Component {
    render() {
        console.log(this.props.day);
        const day = this.props.day;
        return (
            <div className='WeatherDay'>
                <span className='WeatherDay-date'>{day.applicable_date}</span>
                <div className='WeatherDay-icon'>
                    <img alt={day.weather_state_name}
                     src={`https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg`}></img>
                    <p>{day.weather_state_name}</p>
                </div>
                <div className='WeatherDay-info'>
                    <p>Max: {Number.parseInt(day.max_temp)}°C</p>
                    <p>Min: {Number.parseInt(day.min_temp)}°C</p>
                    <div className='wind'>
                        <span className="dir" style={{transform: `rotate(${day.wind_direction}deg)`}}></span>
                        {Number.parseInt(day.wind_speed)}mph
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherDay;
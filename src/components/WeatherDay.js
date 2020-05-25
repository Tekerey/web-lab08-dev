import React from 'react';
import moment from 'moment';
import './Weather.css';

class WeatherDay extends React.Component {
    render() {
        //console.log(this.props.day);
        const day = this.props.day;
        return (
            <div id={`WeatherDay${this.props.id}`} className='WeatherDay'>
                <span className='WeatherDay-date'>{moment(day.applicable_date).calendar({
                    sameDay: '[Today]',
                    nextDay: '[Tomorrow]',
                    nextWeek: 'ddd D MMM',
                    sameElse: 'ddd D MMM',
                })}</span>
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
                    <div>
                        <h4>Humidity</h4>
                        <p>{day.humidity}%</p>
                        <h4>Visibility</h4>
                        <p>{Number.parseFloat(day.visibility).toFixed(1)} miles</p>
                        <h4>Pressure</h4>
                        <p>{Number.parseFloat(day.air_pressure).toFixed(0)}mb</p>
                    </div>
                    <h4>Confidence</h4>
                    <p>{day.predictability - this.props.id * 10}%</p>
                </div>
            </div>
        );
    }
}

export default WeatherDay;